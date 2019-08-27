<template>
    <div class="distribution-title">
        <p>{{title}}</p>
        <template>
            <slot></slot>      
        </template>
    </div>
</template>

<script>
export default {
  
  props: {
    title: {
        type:String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

      .distribution-title{
            display: flex;
            align-items: center;
            justify-content: space-between; 
            margin-bottom: 10px;
            padding-bottom: 10px !important;
          p {
                font-size:$font-small;
                font-weight: bold;
            } 
    
      }

</style>
