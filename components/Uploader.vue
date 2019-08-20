<template>
  <uploader @files-added="filesAdded" :options="options">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop class="d-flex align-center justify-center">
      <span class="mr-3">Drop Files Here</span>
      <uploader-btn class="caption">Select Files</uploader-btn>
    </uploader-drop>
  </uploader>
</template>

<script>
export default {
  data: () => ({
    options: {
      allowDuplicateUploads: true
    }
  }),

  methods: {
    filesAdded(files) {
      console.log(files)
      this.$emit('filesAdded', files)
    }
  }
}
</script>