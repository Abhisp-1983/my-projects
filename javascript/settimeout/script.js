
// Settimeout Function
// setTimeout(() => {
//     console.log("Hello Javascript!");
// }, 3000)

//Callback Function
// function sum(a,b) {
//     console.log(a+b);
// }

// function calaculator(a,b,sumcallback) {
//     sumcallback(a,b);
// }

// setTimeout(() => {
//     calaculator(100,3,sum);
// }, 3000);

//Get Data after few seconds
function getData(dataId, getNextData) {
    setTimeout(() => {
        console.log("Data:",dataId); 
        if (getNextData) {
            getNextData();
        }
    }, 1000);
}

getData(1, () => {
    getData(2, () => {
        getData(3, () => {
            getData(4, () => {
                getData(5, () => {
                    getData(6, () => {
                        getData(7, () => {
                            getData(8, () => {
                                getData("Task is completed")
                            });
                        })
                    })
                })
            })
        })
    });
})