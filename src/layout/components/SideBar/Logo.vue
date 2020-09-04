<template>
  <div class="logo">
    <a href="/">
      <img class="top-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAwCAYAAABT9ym6AAACyElEQVRoQ+1ZTWgTQRh9L+JBxCCCBwsWD82uBfVi8WIQexIpeBMEERRPKgjZtODNeFNsNsWDggh6quBJUbxaKfSiRVCK7IaCogiCFAxiQdx8MiuJMTS7mfxs1rp7Sna+n/e+N7PzzS6heZUcOQXiqgBDmq6+OYkZr4rnkyYfduLfyoc6wW6UJf1T8FXHp4XtnGVwvAdx6iG0iNiO3AFxticAPOyzRvmmJ7GU0jqBbFeeATis49PK1vMwPjXKuV7E8qesTqBmIgKcyRu8Fxaj9E52yA8sANhVs40VEctg24UoOlIgcTkhEiJ72xVVcZqnViwVKbryiMAhAFvD5nxU4wQ+CbFoZXgsLKeviO2KhBkOdJxYsjLcE4SBtiMPQBwfKNA2kovgSt5koeXObruidup0G7EGayJ4apmcCCIS72n1B3lgW8PYr4+EyGBXQlD2ZGrFTZtgRa6/lZ605VGwDmr7tXqtKMB2mmP9EOlmH6l1v0VXThO4u1Y16zZN55EOKt+np5ZgwTJ5UAGadiSbIubXAFdP3nywig0RAss5gyMK0MyyDFc9vG8GR+BWzuB5dT/ORL7lDG6pgbcdeQli/19kiAtWhjdjTUSBq6YwNjnCRfW75MhRAUogTPVfgBd5gwcaiHZ7XOjTGvmNcNYyeLJRBX9fIlamdvN17X7JlQkBnnSwLhpd+koE6sCzMQX7YoaVtYBOl+VISnAbwHCsifjgiCVUMYsUPleBjwTSFAxBsLdnbyaB/irSZZV13BMiOtWKwjZRJIoq6+RIFNGpVhS2iSJRVFknx/+jiOqR6u24TokitSUeB31eYMmVeQGykYLqJJngmmXyUitX9VnhBIj7ncSO0OeLZXB7UD7/LUqxLOco8E9yMbxeVSrIFsb4PZSIMrA/yDZvFRl42BQbMsTKhs0oWzu5GoZp/bzXCmP6r4wnisRNqV+uvldAZid8CQAAAABJRU5ErkJggg==">
      <h4>Vue-Tools</h4>
    </a>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
.logo {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding-left: 16px;
  overflow: hidden;
  background: #1f2d3d;
  .top-logo {
		width: 34px;
		height: 32px;
		object-fit: cover;
		vertical-align: middle;
	}
  h4 {
    margin: 0;
    margin-left: 10px;
    display: inline-block;
    color: #fff;
    vertical-align: middle;
  }
}
</style>
