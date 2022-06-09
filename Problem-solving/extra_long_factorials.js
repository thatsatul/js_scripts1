// Complete the extraLongFactorials function below.
function extraLongFactorials(n, x) {
    // console.log(n);
    if(n === 1) {
        return;
    }
    let fact = null;
    if(x <= 1) {
        return 1;
    }
    else {
        fact = BigInt(x) * BigInt(extraLongFactorials(n, x-1));
        if(n === x) {
            console.log(fact.toString());
        } else {
            return fact;
        }
    }
}

function main() {
    const n = 50;
    extraLongFactorials(n, n);
}

main();
