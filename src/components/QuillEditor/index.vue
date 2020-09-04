<template>
  <div :class="prefixCls">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import {
    quillEditor
  } from 'vue-quill-editor';

  const toolBar = [
    // 字体颜色，字体背景颜色 // 字体大小
    [{ color: [] }, { background: [] }],
    // 几级标题
    [
      { size: ['small', false, 'large', 'huge'] },
      { header: [1, 2, 3, 4, 5, 6, false] }
    ],
    // 加粗，斜体，下划线，删除线
    ['bold', 'italic', 'underline', 'strike'],
    // 列表// 缩进//对齐方式//上传图片、上传视频 //清除字体样式
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] },
      'image',
      'clean'
    ]
  ];

  export default {
    name: 'QuillEditor',
    components: {
      quillEditor
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ant-editor-quill'
      },
      // 表单校验用字段
      // eslint-disable-next-line
    value: {
        type: String
      }
    },
    model: {
      props: 'value',
      event: 'change'
    },
    data () {
      return {
        content: this.value,
        editorOption: {
          modules: {
            toolbar: toolBar
          }
        }
      };
    },
    methods: {
      onEditorBlur (quill) {
        console.log('editor blur!', quill);
      },
      onEditorFocus (quill) {
        console.log('editor focus!', quill);
      },
      onEditorReady (quill) {
        console.log('editor ready!', quill);
      },
      onEditorChange ({ quill, html, text }) {
        console.log('editor change!', quill, html, text);
      }
    },
    watch: {
      value (val) {
        this.content = val;
      }
    }
  };
</script>

<style lang="less" scoped>

/deep/ .ql-toolbar {
  padding: 0;
}

/deep/ .ql-snow {
  * {
    outline: none;
    line-height: 1.5;
  }

  .ql-editor {
    min-height: 100px;
  }

  .ql-picker.ql-size {
    .ql-picker-label[data-value="small"]::before,
    .ql-picker-item[data-value="small"]::before {
      content: "小号(12px)";
    }

    .ql-picker-label[data-value="large"]::before,
    .ql-picker-item[data-value="large"]::before {
      content: "中号(18px)";
    }

    .ql-picker-label[data-value="huge"]::before,
    .ql-picker-item[data-value="huge"]::before {
      content: "大号(24px)";
    }

    .ql-picker-label::before,
    .ql-picker-item::before {
      content: "默认(14px)";
    }
  }

  .ql-picker.ql-header {
    .ql-picker-label[data-value="1"]::before,
    .ql-picker-item[data-value="1"]::before {
      content: "标题1";
    }

    .ql-picker-label[data-value="2"]::before,
    .ql-picker-item[data-value="2"]::before {
      content: "标题2";
    }

    .ql-picker-label[data-value="3"]::before,
    .ql-picker-item[data-value="3"]::before {
      content: "标题3";
    }

    .ql-picker-label[data-value="4"]::before,
    .ql-picker-item[data-value="4"]::before {
      content: "标题4";
    }

    .ql-picker-label[data-value="5"]::before,
    .ql-picker-item[data-value="5"]::before {
      content: "标题5";
    }

    .ql-picker-label[data-value="6"]::before,
    .ql-picker-item[data-value="6"]::before {
      content: "标题6";
    }

    .ql-picker-label::before,
    .ql-picker-item::before {
      content: "正常";
    }
  }
}
</style>
