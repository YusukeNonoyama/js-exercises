export function isEmailAddress(input: string){
    if(!input){
        return false;
    }
    const pattern = /^(\w+\.\w+|(\w|[!#$%&'*+\-/=?^_`{|}~]){1,64})@((\w|[!#$%&'*+\-/=?^_`{|}~])+\.(\w|[!#$%&'*+\-/=?^_`{|}~])+|\w{1,252})$/u;
        if(input.match(pattern)){
            return true;
        }
        return false;
}

