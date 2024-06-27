<template>
  <van-uploader
    v-if="avatar"
    :after-read="afterRead"
    :max-count="1"
    accept="image/*"
    class="uploader-image"
    :max-size="1024 * 1024 * 20"
    @oversize="oversize"
  >
    <slot></slot>
  </van-uploader>
  <van-uploader
    v-else
    :after-read="afterRead"
    v-model="fileList"
    :max-count="maxCount"
    accept="image/*"
    class="uploader-image"
    :max-size="1024 * 1024 * 20"
    @oversize="oversize"
  ></van-uploader>
</template>

<script>
import axios from 'axios';
import { showToast } from 'vant';

import { getUploadToken } from '@/api/common';

export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    watermark: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    maxCount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
        const isCompleted = val.every((item) => item.url);

        if ((val.length && isCompleted) || val.length === 0) {
          if (Array.isArray(this.modelValue)) {
            this.$emit(
              'update:model-value',
              val.map((item) => item.url),
            );
          } else {
            this.$emit('update:model-value', val.length ? val[0].url : '');
          }
        }
      },
    },
  },
  methods: {
    oversize() {
      showToast('图片过大，请重新上传');
    },
    setWatermark(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = (event) => {
          const image = new Image();
          image.src = event.target.result;
          image.crossOrigin = 'anonymous';

          image.onload = () => {
            const watermark = new Image();
            watermark.src = require('./watermark.json').default;
            watermark.crossOrigin = 'anonymous';

            watermark.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = image.width;
              canvas.height = image.height;

              const ctx = canvas.getContext('2d');
              ctx.drawImage(image, 0, 0);

              // 添加水印图片
              ctx.drawImage(watermark, 0, 0, image.width, image.height); // 调整水印位置

              canvas.toBlob((blob) => {
                const newFile = new File([blob], file.name, {
                  type: file.type,
                });
                resolve(newFile);
              }, file.type);
            };
          };
        };
      });
    },
    async afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';

      try {
        const res = await getUploadToken({
          step: this.step,
          task_id: this.id,
          filename: file.file.name,
          user_type: this.type,
        });

        const params = res.data;
        let formData = new FormData();

        formData.append('key', params.key);
        formData.append('token', params.token);

        try {
          formData.append('file', file.file, file.file.name);

          const res = await axios({
            url: params.upload_domain,
            method: 'post',
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (res.data.name) {
            file.url = params.domain + params.key;
            file.status = 'success';
            this.$emit('success', file.url);
          } else {
            file.status = 'failed';
            file.message = '上传失败';
            showToast('上传失败');
          }
        } catch (err) {
          file.status = 'failed';
          file.message = '上传失败';
          console.log(err, '上传失败');
        }
      } catch (err) {
        file.status = 'failed';
        file.message = '上传失败';
        showToast(err.response.statusText || err.message);
      }
    },
  },
  mounted() {
    if (Array.isArray(this.modelValue)) {
      this.fileList = this.modelValue.map((url) => {
        return { url };
      });
    } else if (this.modelValue) {
      this.fileList = [{ url: this.modelValue }];
    }
  },
};
</script>
