## localStorage と sessionStorage それぞれに保存されたデータの有効期限がどのように異なるか、実際に動作確認して結果を記述しなさい。
* localStorage
    * ブラウザを閉じても消えない。明示的に削除をするまで残る（localStorage.clear()）。
* sessionStorage
    * タブを閉じると消える。