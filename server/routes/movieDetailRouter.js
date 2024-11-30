const express = require('express')
const router = express.Router()
const movieDetailController = require("../controllers/movieDetailController")
const axios = require('axios')

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        let data1 = [];
        let data2 = [];
  
        const result1 = await new Promise((resolve, reject) => {
            movieDetailController.getMovieDetail((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, id);
        });

        const result2 = await new Promise((resolve, reject) => {
            movieDetailController.getUpcomingSchedule((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, id);
        });
  
        // Combine data
        data1 = [...data1, ...result1];
        data2 = [...data2, ...result2];
        const data = [data1, data2];
        // Send response
        res.json(data);
    } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }

})

router.post("/:id/order", async (req, res) => {
    const {showdate, showtime, showtimeid, room} = req.body;
    // console.log(req.body)
    const formattedDate = new Date(showdate)
    console.log(formattedDate)
    try {
        let data1 = [];
        let data2 = [];
        let data3 = [];
  
        const result1 = await new Promise((resolve, reject) => {
            movieDetailController.getMovieSchedule((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, formattedDate, showtime);
        });

        const result2 = await new Promise((resolve, reject) => {
            movieDetailController.getRoomChairs((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, room);
        });

        const result3 = await new Promise((resolve, reject) => {
            movieDetailController.getBookedChairs((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, showtimeid);
        });
  
        // Combine data
        data1 = [...data1, ...result1];
        data2 = [...data2, ...result2];
        data3 = [...data3, ...result3];
        const data = [data1, data2, data3];
        // Send response
        // console.log(data)
        res.json(data);
    } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }

})

router.post("/:id/confirm", async (req, res) => {
    // const bill = 10000

    const {showtimeid, chairs, bill, payment, userid} = req.body;
    // console.log(req.body)
    // let paymentid = 0;

    // if(payment == "ZaloPay")
    //     paymentid = 2
    // else if(payment == "MoMo")
    //     paymentid = 1
    // await new Promise((resolve, reject) => {
    //     movieDetailController.insertOrder((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     }, userid, showtimeid, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, paymentid, chairs.length, bill);
    // });

    // const result1 = await new Promise((resolve, reject) => {
    //     movieDetailController.getLatestOrderId((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    // for (let seatid of chairs){
    //     await new Promise((resolve, reject) => {
    //         movieDetailController.insertOrderDetail((err, result) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(result);
    //             }
    //         }, result1[0].MaxOrderId, seatid);
    //     });
    // }
    // data1 = [...data1, ...result1]

    // const data = [data1]
    // console.log(result1[0].MaxOrderId + 1)

    // return res.json(req.body)


    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'Mylta Cinema';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:5173/moviedetail/8/success';
    // var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'http://localhost:5173/moviedetail/8/success';
    var requestType = "payWithMethod";
    var amount = bill;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData ='';
    var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
    });
    // //Create the HTTPS objects
    // const https = require('https');
    // const options = {
    //     hostname: 'test-payment.momo.vn',
    //     port: 443,
    //     path: '/v2/gateway/api/create',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': Buffer.byteLength(requestBody)
    //     }
    // }
    // //Send the request and get the response
    // const req = https.request(options, res => {
    //     console.log(`Status: ${res.statusCode}`);
    //     console.log(`Headers: ${JSON.stringify(res.headers)}`);
    //     res.setEncoding('utf8');
    //     res.on('data', (body) => {
    //         console.log('Body: ');
    //         console.log(body);
    //         console.log('resultCode: ');
    //         console.log(JSON.parse(body).resultCode);
    //     });
    //     res.on('end', () => {
    //         console.log('No more data in response.');
    //     });
    // })

    // req.on('error', (e) => {
    //     console.log(`problem with request: ${e.message}`);
    // });
    // // write data to request body
    // console.log("Sending....")
    // req.write(requestBody);
    // req.end();
    // options for axios
    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'Access-Control-Allow-Origin' : 'http://localhost:5173',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        data: requestBody,
    };

    // Send the request and handle the response
    let result;
    try {
        result = await axios(options);
        return res.status(200).json(result.data.payUrl);
        // res.redirect(result.data.payUrl)
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
})

module.exports = router