const monthsHave31DaysArray = ["Jan","Mar","May","Jul","Aug","Oct","Dec"];
const monthsNotHave31DaysArray = ["Feb","Apr","Jun","Sep","Nov"];        

export class Has31Days {
    // if文で不通に書いた場合
    static withElseif(month){
        if(month === "Jan") return true;
        else if(month === "Jan") return true;
        else if(month === "Mar") return true;
        else if(month === "May") return true;
        else if(month === "Jul") return true;
        else if(month === "Aug") return true;
        else if(month === "Oct") return true;
        else if(month === "Dec") return true;
        else if(month === "Feb") return false;
        else if(month === "Apr") return false;
        else if(month === "Jun") return false;
        else if(month === "Sep") return false;
        else if(month === "Nov") return false;
        else throw new Error("Invalid Input");
    }

    // switch文で普通に書いた場合
    static withSwitch(month){
        switch(month){
            case "Jan": return true; break;
            case "Mar": return true; break;
            case "May": return true; break;
            case "Jul": return true; break;
            case "Aug": return true; break;
            case "Oct": return true; break;
            case "Dec": return true; break;
            case "Feb": return false; break;
            case "Apr": return false; break;
            case "Jun": return false; break;
            case "Sep": return false; break;
            case "Nov": return false; break;
            default: throw new Error("Invalid Input");
        }
    }

    // if文で読みやすく書いた場合
    static withElseif2(month){
        if(monthsHave31DaysArray.includes(month)) return true;
        else if(monthsNotHave31DaysArray.includes(month)) return false;
        else throw new Error("Invalid Input");
    }

    // switch文で読みやすく書こうとして失敗したもの
    static withSwitch2(month){
        switch(month){
            case monthsHave31DaysOr: return true; break;
            case monthsNotHave31DaysOr: return false; break;
            default: throw new Error("Invalid Input");
        }
    }
}

// テスト作成前の確認
function test_function(func){
    try{
        console.log(func("Jan"));
        console.log(func("Feb"));
        console.log(func(true));
    } catch(e){
        console.error(e.message)
    }
}

console.log("======withElseif()===================")
test_function(Has31Days.withElseif)
console.log("======withSwitch()===================")
test_function(Has31Days.withSwitch)
console.log("======withElseif2()===================")
test_function(Has31Days.withElseif2)
console.log("======withSwitch2()===================")
test_function(Has31Days.withSwitch2)
