function calendar(month) {
  const week = ['日', '月', '火', '水', '木', '金', '土'];

  const year = new Date().getFullYear();
  const monthStart = new Date(year, month - 1, 1);  // 月の開始日
  const monthEnd = new Date(year, month, 0);  // 月の終了日

  const calendar = [];
  let one_week = [];

  // 1日は何曜日か
  let startDay = monthStart.getDay();

  // もし1日が日曜日以外なら、その前の空白を埋める
  for (let i = 0; i < startDay; i++) {
      one_week.push('  ');
  }

  // 月の1日から最終日までループ
  for (let date = 1; date <= monthEnd.getDate(); date++) {
      one_week.push(String(date).padStart(2, ' '));  // 日付を2桁に調整
      if (one_week.length === 7) {
          calendar.push(one_week);
          one_week = [];
      }
  }

  // 最後の週が土曜日まで埋まらない場合もあるので、それを追加
  if (one_week.length > 0) {
      while (one_week.length < 7) {
          one_week.push('  ');
      }
      calendar.push(one_week);
  }

  // 月の名前を表示
  console.log(`      ${month}月 ${year}`);
  console.log(week.join(' '));  // 曜日を表示
  
  // 各週の日付を表示
  calendar.forEach(week => {
      console.log(week.join(' '));
  });
}

// コマンドライン引数を取得
const args = process.argv.slice(2);
let month = new Date().getMonth() + 1;  // オプションなしの場合のために、当月を取得

// -mオプションが指定されていた場合、その後の引数を月として取得
if (args.includes('-m')) {
    const monthIndex = args.indexOf('-m') + 1;
    if (monthIndex < args.length) {
        const inputMonth = parseInt(args[monthIndex], 10);  // 指定された月を取得
        if (inputMonth >= 1 && inputMonth <= 12) {
            month = inputMonth;  // 正常な月が指定された場合のみ更新
        } else {
            console.error('エラー: 月は1から12の範囲で指定してください。');
            process.exit(1);
        }
    } else {
      console.error('エラー: mオプションには引数が必要です。(1-12)');
      process.exit(1);
    }
}

// 指定された月のカレンダーを表示
calendar(month);
