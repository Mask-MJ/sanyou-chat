<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="h-full">
    <NaiveProvider>
      <n-layout class="h-full" has-sider>
        <n-layout-sider bordered :width="230" :native-scrollbar="false">
          <LayoutSider />
        </n-layout-sider>
        <n-layout>
          <n-layout-content class="h-full">
            <div class="flex flex-col wh-full">
              <div class="bg-gray-50 p-4 h-full">
                <div class="border-gray-800 shadow-md h-full rounded-md bg-white">
                  <RouterView />
                </div>
              </div>
            </div>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </NaiveProvider>
  </n-config-provider>
</template>
