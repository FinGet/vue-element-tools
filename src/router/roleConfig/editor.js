const EditorTree = {
  path: '/editor',
  title: '富文本',
  desc: '富文本',
  key: 'editor',
  type: 'model',
  children: [
    {
      path: '/editor/index',
      title: 'tinymce',
      desc: 'tinymce',
      key: 'editor_tinymce',
      type: 'page'
    },
    {
      path: '/editor/quill',
      title: 'quill',
      desc: 'quill',
      key: 'editor_quill',
      type: 'page'
    }
  ]
};

export default EditorTree;
