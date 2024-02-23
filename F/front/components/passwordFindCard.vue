<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-3/12 p-12"
    >
      <h1 class="text-black flex justify-center text-3xl">passwordFind</h1>
      <div class="mt-8">
        <label
          for="Email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          v-model="email"
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nayoun440@naver.com"
          required
        />
      </div>

      <div class="flex justify-between p-2">
        <NuxtLink to="/login">
          <div class="text-black cursor-pointer hover:text-blue-300 mt-5">
            로그인하러가기
          </div>
        </NuxtLink>
        <NuxtLink to="/signUp">
          <div class="text-black cursor-pointer hover:text-blue-300 mt-5">
            회원가입
          </div>
        </NuxtLink>
      </div>
      <div
        class="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 cursor-pointer"
        @click="checked()"
      >
        확인
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const email = ref('');


const checked = async ()=> {
  const userInfo = {
    email:email.value
  };

  const response = await Fetch("user/passwordFind", userInfo);
  console.log(response)
  
    
    // 요청한 email로 계정 조회후, 없으면 error 있으면 true
    successQuery(response,router,response.email,"passwordChange")
      error(response, router, "error");


};

/**
   2. catch구문 작동안됨
 */
</script>

<style lang="scss" scoped></style>
