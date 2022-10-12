// 結果表示のやつ
var result_el = document.getElementById('result');
function resultDsp(text) {
    var new_el = document.createElement('li');
    new_el.textContent = text;
    result_el.appendChild(new_el);
}

// idによるチェックの有無,有で0,無で1を返答
function CCid(subjectid) {
    let element = document.getElementById(subjectid);
    if (element.checked == true) {
        return 0;
    } else {
        return 1;
    }
}

// classによるチェックの有無,チェック数を返答
function CCclass(subjectclass) {
    let el = document.getElementsByClassName(subjectclass);
    let count = 0;

    for (let i = 0; i < el.length; i++) {
        if (el[i].checked) {
            count++;
        }
    }
    return count;
}

// 人間
function ningen() {
    // 単位数判定
    var ningen = CCclass('ckbox_nin')

    if (ningen < 2) {
        resultDsp(`「人間」の単位数が卒業要件に対して${[2 - ningen]}つ不足しています.`)
    }

    // 教養ゼミの取得有無
    var kyoyo = CCid('kyoyo1') + CCid('kyoyo2');
    if (kyoyo >= 1) {
        resultDsp('教養ゼミの単位が' + kyoyo + 'つ不足しています.これは必修科目です.')
    }

    return ningen;
}

// 社会・環境
function shakai() {
    // 単位数判定
    var shakai = CCclass('ckbox_syak') * 2;

    if (shakai < 6) {
        resultDsp(`「社会・環境」の単位数が卒業要件に対して${[6 - shakai]}つ不足しています.`)
    }

    // 環境論の取得有無
    if (CCid('kankyo1') == 1) {
        resultDsp('環境論Ⅰの単位が不足しています.これは必修科目です.')
    }
    if (CCid('kankyo2-1') + CCid('kankyo2-2') > 1) {
        resultDsp('環境論Ⅱの単位が不足しています.これは必修科目です.')
    }

    return shakai;
}

// 言語・文化
function gengo() {
    // 単位数判定
    var gengo = CCclass('ckbox_gng') * 2 + CCclass('ckbox_gnge');
    if (gengo < 4) {
        resultDsp(`「言語・文化」の単位数が卒業要件に対して${[4 - gengo]}つ不足しています.`)
    }

    // 日本語表現法の取得有無
    if (CCid('nihonhyougen-1') + CCid('nihonhyougen-2') > 1) {
        resultDsp('日本語表現法の単位が不足しています.これは必修科目です.')
    }

    return gengo;
}

// 精神・身体
function seisin() {
    // 単位数判定
    var seisin = CCclass('ckbox_sis') * 2 + CCclass('ckbox_sisk');
    if (seisin < 3) {
        resultDsp(`「精神・身体」の単位数が卒業要件に対して${[3 - seisin]}つ不足しています.`)
    }

    //健康科学演習の取得有無
    if (CCid('kenkouex-1') + CCid('kenkouex-2') > 1) {
        resultDsp('健康科学演習の単位が不足しています.これは必修科目です.')
    }

    return seisin;
}

// 総合科目のチェッカー
function checker() {
    if (CCid('overseas') == 0) {
        resultDsp('Sorry, this checker is not available for overseas students now.');
    }
    var sougouSum = ningen() + shakai() + gengo() + seisin();
    if (sougouSum < 15) {
        resultDsp(`「総合科目計」の単位数が卒業研究履修条件に対して${[15 - sougouSum]}つ不足しています.`)
    } else if (sougouSum != 19) {
        resultDsp(`「総合科目計」の単位数が卒業要件を満たしていません.あなたは今${[sougouSum]}単位を取得していますが,要件は19単位です.`)
    }
    resultDsp('check done.');
}

function scl() {
    var elbox = document.getElementById('res_box');
    elbox.scrollIntoView({behavior: "smooth", block: "end"});
}

// 同意の確認
function allcheck() {
    result_el.innerHTML = "";
    if (CCid('agree') == 0) {
        checker();
        scl();
    } else {
        resultDsp('「単位をチェックする」ボタン下の内容に同意し、チェックボックスをクリックすることで、単位チェックが開始します');
        scl();
    }
}