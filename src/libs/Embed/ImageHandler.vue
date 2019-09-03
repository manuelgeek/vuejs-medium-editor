<template>
    <file-upload
        class="btn-toggle"
        :post-action="uploadUrl"
        :headers="uploadUrlHeader"
        :name="file_input_name"
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        :multiple="true"
        :size="1024 * 1024 * 10"
        v-model="insert.files"
        @input-filter="inputFilter"
        @input-file="inputFile"
        ref="upload">
        <font-awesome-icon :icon="['far', 'images']" />
    </file-upload>
</template>

<script>
export default {
    
}
</script>