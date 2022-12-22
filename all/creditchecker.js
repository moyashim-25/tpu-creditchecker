/*==========
    結果表示
==========*/
// liを追加
const result_el = document.getElementById('result');
function DspResult(text) {
    const new_li_el = document.createElement('li');
    new_li_el.textContent = text;
    result_el.appendChild(new_li_el);
}

// スクロール表示
function scl() {
    var elbox = document.getElementById('res_box');
    elbox.scrollIntoView({ behavior: "smooth", block: "start" });
}

/*==========
    起動ボタン
==========*/
// 同意の確認
function check() {
    result_el.innerHTML = "";
    if (CCid('agree') == 0) {
        checker();
        scl();
    } else {
        DspResult('info:「単位をチェックする」ボタン下の内容に同意し、チェックボックスをクリックすることで、単位チェックが開始します');
        scl();
    }
}

function checker() {
    Csogo();
    DspResult('===== すべてのチェックが完了しました =====');
}

/*==========
    単位判定
==========*/
// idによるチェック有無
function CCid(SubjectID) {
    let CCELbyID = document.getElementById(SubjectID);
    if (CCELbyID.checked == true) {
        return 0;
    } else {
        return 1;
    }
}

// classによるチェックカウント
function CCclass(subjectCLASS) {
    let CCELbyCLASS = document.getElementsByClassName(subjectCLASS);
    let count = 0;
    for (let i = 0; i < CCELbyCLASS.length; i++) {
        if (CCELbyCLASS[i].checked) {
            count++;
        }
    }
    return count;
}

// 必修のチェックと結果表示
function mustC(SubjectID, subjectName) {
    if (CCid(SubjectID) == 1) {
        DspResult(`ERROR:【必修未取得】${[subjectName]}は必修科目です`);
    }
}

// 選択必修のチェックと結果表示
function chooseC(SubjectCredits, subjectTitle, NeedChooseCredits, MustChooseCredits) {
    if (SubjectCredits < NeedChooseCredits) {
        DspResult(`ERROR:【${[subjectTitle]}の単位不足】卒業研究履修単位条件に対して${[NeedChooseCredits - SubjectCredits]}単位不足しています`);
    } else if (SubjectCredits < MustChooseCredits) {
        DspResult(`ERROR:【${[subjectTitle]}の単位不足】卒業要件単位に対して${[MustChooseCredits - SubjectCredits]}単位不足しています`);
    }
}

// 単位互換
function addCredits() {
}

/*==========
    各科目のチェック
==========*/

// 小区分単位数
var ningen;
var syakai;
var gengo;
var seisin;
var sogo;

// 総合合計
function Csogo() {
    // 小区分単位数の用意とリセット
    ningen = 0;
    syakai = 0;
    gengo = 0;
    seisin = 0;
    sogo = 0;
    DspResult('===== 総合科目 =====')

    // コンソーシアムなど単位互換
        if (CCid('ningen_cons') == 0) {
            let nin_cos_sub = document.getElementById('ningen_cos_sub');
            let nin_cos_crd = document.getElementById('ningen_cos_crd');
            if (nin_cos_crd.valueAsNumber >= 0) {
                ningen += nin_cos_crd.valueAsNumber;
                DspResult(`info:【単位互換】「人間」に科目名「${[nin_cos_sub.value]}」が${[nin_cos_crd.value]}単位追加されました`);
            }
        }
        if (CCid('syakai_cons') == 0) {
            let sya_cos_sub = document.getElementById('syakai_cos_sub');
            let sya_cos_crd = document.getElementById('syakai_cos_crd');
            if (sya_cos_crd.valueAsNumber >= 0) {
                syakai += sya_cos_crd.valueAsNumber;
                DspResult(`info:【単位互換】「社会・環境」に科目名「${[sya_cos_sub.value]}」が${[sya_cos_crd.value]}単位追加されました`);
            }
        }
        if (CCid('gengo_cons') == 0) {
            let gen_cos_sub = document.getElementById('gengo_cos_sub');
            let gen_cos_crd = document.getElementById('gengo_cos_crd');
            if (gen_cos_crd.valueAsNumber >= 0) {
                gengo += gen_cos_crd.valueAsNumber;
                DspResult(`info:【単位互換】「言語・文化」に科目名「${[gen_cos_sub.value]}」が${[gen_cos_crd.value]}単位追加されました`);
            }
        }
        if (CCid('seishin_cons') == 0) {
            let sei_cos_sub = document.getElementById('seishin_cos_sub');
            let sei_cos_crd = document.getElementById('seishin_cos_crd');
            if (sei_cos_crd.valueAsNumber >= 0) {
                seisin += sei_cos_crd.valueAsNumber;
                DspResult(`info:【単位互換】「精神・身体」に科目名「${[sei_cos_sub.value]}」が${[sei_cos_crd.value]}単位追加されました`);
            }
        }

    // 人間
        // 単位数判定
        ningen += CCclass('ningen_1') + CCclass('ningen_2') * 2;
        chooseC(ningen, '人間', 2, 2);
        // 必修単位取得判定
        mustC('kyoyo1', '教養ゼミⅠ');
        mustC('kyoyo2', '教養ゼミⅡ');
        
    //社会・環境
        // 単位数判定
        syakai += CCclass('syakai_2') * 2;
        chooseC(syakai, '社会・環境', 6, 6);
        // 必修単位取得判定
        mustC('kankyo1', '環境論Ⅰ');
        mustC('kankyo2', '環境論Ⅱ');
    
    // 言語・文化
        // 単位数判定
        gengo += CCclass('gengo_1') + CCclass('gengo_2') * 2;
        chooseC(gengo, '言語・文化', 4, 4);
        // 必修単位取得判定
        mustC('nihongohyougen', '日本語表現法');

    // 精神・身体
        // 単位数判定
        seisin += CCclass('seishin_1') + CCclass('seishin_2') * 2;
        chooseC(seisin, '精神・身体',3, 3);
        // 必修単位取得判定
        mustC('kenkouex', '健康科学演習');

    // 総合科目小計
        sogo = ningen + syakai + gengo + seisin;
        chooseC(sogo, '総合科目',15, 19);
}