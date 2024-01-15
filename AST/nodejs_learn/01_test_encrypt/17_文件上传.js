// 定义分片的大小: 2M
const chunkSize = 2 * 1024 * 1024;

export default {
    name: "addImportTask",
    props: {
        dialogVisible: Boolean,
        // 来源类型
        sourceType: {
            default: ""
        },
        // 1-发文原始数据列表，2-科学平台发文原始数据列表，3-专利原始数据列表，4-基金原始数据列表，5-科学平台基金原始数据列表
        type: {
            default: 0
        }
    },
    watch: {
        dialogVisible: {
            handler(val) {
                if (val) {
                    this.fileUploadDialog.visible = false;
                    this.fileList = [];
                    this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
                    this.$nextTick(() => {
                        this.importTaskDialog.ruleForm.sourceType = this.sourceType;
                        this.importTaskDialog.ruleForm.fileSource = 1;
                        this.importTaskDialog.ruleForm.isCover = 0;
                    })
                }
            },
            immediate: true,
        },
    },
    created() { },
    data() {
        const validateFileUp = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error('请选择文件来源'));
            }
            setTimeout(() => {
                if (value == 1) {
                    if (!this.fileList.length) {
                        callback(new Error('请上传文件'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            }, 500);
        };
        return {
            // 添加导入任务 弹窗
            importTaskDialog: {
                visible: false,
                loadConfirm: false,
                // 表单
                ruleForm: {
                    schoolId: "",
                    vyear: "",
                    sourceType: "",
                    fileSource: "",
                    isCover: "",
                },
                rules: {
                    sourceType: [
                        { required: true, message: '请选择发文来源', trigger: 'blur' },
                    ],
                    fileSource: [
                        // { required: true, message: '请选择文件来源', trigger: 'blur' },
                        { required: true, validator: validateFileUp, trigger: 'blur' }
                    ],
                    isCover: [
                        { required: true, message: '请选择是否覆盖', trigger: 'blur' },
                    ],
                }
            },
            // 选择文件 弹窗
            fileUploadDialog: {
                visible: false,
            },
            // 表格
            tableColumns: [
                { prop: "name", label: "文件名", minWidth: "150px", align: "center" },
                { prop: "size", label: "文件大小", minWidth: "100px", align: "center" },
                { prop: "status", label: "状态", minWidth: "100px", align: "center" },
                { prop: "percentage", label: "上传进度", minWidth: "180px", align: "center", type: "template" },
                { prop: "handle", label: "操作", minWidth: "120px", align: "center", type: "template" },
            ],
            // 文件相关
            fileList: [],
        }
    },
    computed: {
        ...mapState(["schoolOptions", "sourceOptions", "yearOptions", "fundSourceOptions"]),
        fileListComp() {
            let arr = [];
            this.fileList.forEach(item => {
                let table = {
                    ...item,
                    size: (item.size / 1024).toFixed(2) + "KB"
                };
                switch (item.status) {
                    case "ready":
                        table.status = "等待上传";
                        table.percentage = 0;
                        break;
                    case "uploading":
                        table.status = "正在上传";
                        break;
                    case "fail":
                        table.status = "上传失败";
                        break;
                    case "success":
                        table.status = "上传成功";
                        table.percentage = 100;
                        break;
                    default:
                        break;
                }
                arr.push(table);
            })
            return arr;
        }
    },
    methods: {
        // 下一步选择文件
        nextSelectFile() {
            this.fileUploadDialog.visible = true;
        },
        closeImportTaskDia() {
            this.$emit("closeImportTaskDia");
        },
        // 点击删除文件
        handleDeleteFile(row, rowIndex) {
            this.fileList.splice(rowIndex, 1);
        },
        confirmImportTask() {
            this.importTaskDialog.loadConfirm = true;
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let addApi = null;
                    if (this.type == 1) {
                        addApi = addOriginalDispatchTask;
                    } else if (this.type == 2) {
                        addApi = addScienceDispatchTask;
                    } else if (this.type == 3) {
                        addApi = addInsertTask;
                    } else if (this.type == 4) {
                        addApi = addOriginalFundTask;
                    } else if (this.type == 5) {
                        addApi = addScienceOriInsertTask;
                    }
                    if (addApi) {
                        addApi({
                            ...this.importTaskDialog.ruleForm,
                            taskFileIds: this.fileList.map(item => item.id).filter(item => item),
                        }).then(res => {
                            this.$MessageBox.MessageSuccess("请求成功");
                            this.$emit("closeImportTaskDia");
                            this.importTaskDialog.loadConfirm = false;
                        }).catch(error => {
                            this.importTaskDialog.loadConfirm = false;
                            this.$MessageBox.MessageWarning(error.data.msg);
                        })
                    }
                } else {
                    this.importTaskDialog.loadConfirm = false;
                    return;
                }
            })
        },
        closeFileDialog() {
            this.fileList = this.fileList.filter(item => item.id);
            this.fileUploadDialog.visible = false;
        },
        // -------------------------------------文件上传-------------------------------------
        // 添加文件、上传成功、上传失败 调用
        uploadChange(file, fileList) {
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            if (this.fileList.findIndex(item => item.uid === file.uid) == -1) {
                this.fileList.push(file);
            }
            if (fileList.findIndex(f => f.name === file.name) != fileList.findLastIndex(f => f.name === file.name)) {
                this.$MessageBox.MessageWarning(file.name + "文件已存在");
                this.fileList.pop();
            }
        },
        // 自定义文件上传
        async uploadFileHandler(uploader) {
            const file = uploader.file;
            let fileName = uploader.file.name;
            let md5 = await this.calculateHashSample(file);
            let size = file.size;
            // check文件是否已经上传
            return quicklyUpload({ md5 }).then(async ({ data }) => {
                if (data != null) {
                    this.fileList.find(item => item.uid == file.uid).id = data;
                    uploader.onSuccess();
                } else {
                    if (size > chunkSize) {
                        // 大于限制，分片上传
                        // 计算当前选择文件需要的分片数量
                        const chunkCount = Math.ceil(size / chunkSize);
                        for (let i = 0; i < chunkCount; i++) {
                            let start = i * chunkSize;
                            let chunk = file.slice(start, Math.min(size, start + chunkSize));
                            const formData = new FormData();
                            formData.append("file", chunk);
                            formData.append("md5", md5);
                            formData.append("name", fileName);
                            formData.append("size", size);
                            formData.append("chunks", chunkCount);
                            formData.append("chunk", i);
                            // 一个分片上传完成后再调用接口上传下一片
                            let res = await this.requestUploadChunk(formData, uploader, size, i);
                            if (res.data) {
                                this.fileList.find(item => item.uid == file.uid).id = res.data;
                            }
                        }
                    } else {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("md5", md5);
                        formData.append("name", fileName);
                        formData.append("size", size);
                        largeFileUpload(formData, uploader, size).then((res) => {
                            this.fileList.find(item => item.uid == file.uid).id = res.data;
                            uploader.onSuccess();
                        }).catch((error) => {
                            uploader.onError();
                            this.$MessageBox.MessageWarning(error.data.msg);
                        });
                    }
                }
            }).catch(error => {
                uploader.onError();
                this.$MessageBox.MessageWarning(error.data.msg);
            });
        },
        requestUploadChunk(formData, uploader, size, chunk) {
            return new Promise((resolve, reject) => {
                largeFileUpload(formData, uploader, size, chunk).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    uploader.onError();
                    reject(error);
                });
            })
        },
        // 开始上传所有文件
        submitUpload() {
            this.$refs.uploadFiles.submit();
        },
        async calculateHashSample(file) {
            // 抽样
            return new Promise((reslove) => {
                const spark = new SparkMD5.ArrayBuffer();
                const reader = new FileReader();
                const size = file.size;
                let offset = 1024 * 1024 * 2;
                let chunks = [file.slice(0, offset)]; //第一个2M，最后一个区块数据全要

                let cur = offset;

                while (cur < size) {
                    if (cur + offset >= size) {
                        // 最后一个区块
                        chunks.push(file.slice(cur, cur + offset));
                    } else {
                        // 中间区块
                        const mid = cur + offset / 2;
                        const end = cur + offset;
                        chunks.push(file.slice(cur, cur + 2)); // 起始位置，取两个字节
                        chunks.push(file.slice(mid, mid + 2)); // 中间位置，取两个字节
                        chunks.push(file.slice(end - 2, end)); // 最后位置，取两个字节
                    }
                    cur += offset;
                }

                reader.onload = (e) => {
                    spark.append(e.target.result);
                    reslove(spark.end());
                };
                reader.readAsArrayBuffer(new Blob(chunks));
            });
        },
    }
}