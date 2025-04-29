import axios from 'axios';

const TELEGRAM_BOT_ID = "7748291044:AAHVmUaNcEMyui1Jzy2h8r_cRYJffdK2vfs"
const TELEGRAM_CHAT_ID = "-1002316866788"

export function TelegramService() {
    return {
        sendEnquiry: async (_) => {
            const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_ID}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=Enquiry%3A%0ABookId%3A${_?.bookID}%0AName%3A${_?.name}%0AFrom%3A${_?.from}%0ATo%3A${_?.to}%0AService%3A${_?.service == "0" ? "OneWay" : "Round Trip"}%0AMobile%3A+%2B91${_?.mobile}%0AIp%3A${_?.ip}`)
                .catch(err => {
                    console.log(err);
                });
            //console.log(response);
        },
        sendSuccess: async (_) => {
            const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_ID}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=Booking%0D%0ABookId%3A${_?.bookID}%0D%0AName%3A${_?.name}%0D%0APhone%3A+%2B91${_?.mobile}%0D%0APickup+City%3A${_?.from}%0D%0ADrop+City%3A${_?.to}%0D%0APickup+Date%3A${new Date(_?.pickupDateTime).toLocaleDateString()}%0D%0APickup+Time%3A${new Date(_?.pickupDateTime).toLocaleTimeString()}%0D%0A` + `${(_?.service == '0') ? "" : "Drop+Date%3A" + _?.dropDate + "%0D%0A"}` + `Service:${_?.service == '0' ? "Oneway+Trip" : "Round+Trip"}%0D%0ACartype:${_?.estimatedData?.cName}%0D%0AEstimated+Price%3A${_?.estimatedData?.price}%0D%0AEstimated+Distance%3A${_?.distance}km%3A`)
                .catch(err => {
                    console.log(err);
                });
            console.log(response);
        }
    };
}

export default TelegramService;