<script setup lang="ts">
import { ref } from 'vue';
import timerStartSoundPath from './assets/FocusStart.ogg';
import timerEndSoundPath from './assets/FocusEnd.ogg';

// refでリアクティブな状態を定義（ReactのuseStateと同じようなものだよ！）
const status = ref('準備OKだよ！');
const isRunning = ref(false);
const timerDuration: number = 10000; // 10秒！

// 通知許可の関数はJS/TSとほぼ同じだよ
const requestNotificationPermission = (): void => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
};

const startTimer = (): void => {
  if (isRunning.value) return; 

  requestNotificationPermission();

  // 1. スタート音を鳴らす！
  const startSound = new Audio(timerStartSoundPath);
  startSound.play().catch((error: Error) => {
    console.error("スタート音を鳴らせなかったよ😢:", error);
  });

  status.value = '10秒タイマー、スタートしたよ！カウントダウン中...⏳';
  isRunning.value = true; // .valueを忘れずに！

  setTimeout(() => {
    // 終了時の処理
    status.value = 'タイマー終了！お疲れさま！🎉';
    isRunning.value = false;
    
    // 2. 終了時の通知
    if (Notification.permission === "granted") {
      new Notification('タイマー終了！', {
        body: '10秒経ったよ！次のタスク、GOGO！🚀',
        icon: '/icon-192x192.png'
      });
    }

    // 3. 終了音を鳴らす！
    const alarmSound = new Audio(timerEndSoundPath); 
    alarmSound.play().catch((error: Error) => {
      console.error("終了音を鳴らせなかったよ😢:", error);
    });
  }, timerDuration);
};
</script>

<template>
  <div class="card">
    <h1>ギャルタイマーサンプル⏰ (Vue/TS版)</h1>
    <p>{{ status }}</p>
    <button 
      @click="startTimer" 
      :disabled="isRunning"
      :style="{
        padding: '15px 30px', 
        fontSize: '1.2em', 
        backgroundColor: isRunning ? '#ccc' : '#ff4081',
        color: 'white', 
        border: 'none', 
        borderRadius: '10px', 
        cursor: isRunning ? 'not-allowed' : 'pointer', 
        marginTop: '20px'
      }"
    >
      {{ isRunning ? '実行中...' : 'スタート！GO！💨' }}
    </button>
  </div>
</template>

<style scoped>
/* スタイルはプロジェクトのひな形にあるものを流用してね */
.card {
  text-align: center;
}

/* default css from template */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
