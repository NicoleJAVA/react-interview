// 第 1 題

function sortUserName(users) {
	users.sort((a, b) => {
		const userA = a.firstName + a.lastName + a.customerID;
		const userB = b.firstName + b.lastName + b.customerID;

		return userA.localeCompare(userB);
	});
}

// 第 2 題

function sortByType(users) {
  const orderMap = {
    systemAnalytics: 1,
    engineer: 2,
    productOwner: 3,
    freelancer: 4,
    student: 5
  };

  users.sort((a, b) => {
    const orderA = orderMap[a.profession];
    const orderB = orderMap[b.profession];
    return orderA - orderB;
  });

}


// .container .shop-list li.item 的權重是 31
// .container .shop-list .item 的權重是 30
// 因此 .container .shop-list li.item 的綠色會具有較高優先權

// 要讓第一個清單變藍色，可以改成這樣：
// .container ol.shop-list .item {
//   color: blue;
// }


// 讓偶數行有背景色
// .container .shop-list li:nth-child(even) {
//   background-color: gray;
// }


// 第 3 題

function getUniqueNumber (items) {
	return items.filter((item, index) => items.indexOf(item) === index);
}

// 第 4 題

// Enum 和 Interface 是 Typescript 的概念。

// Interface 可以確保參數、 type 等等實作細節的一致性，預先防止這些 bug，
// 此外，還可以達到解藕合的效果，若今天要實作的兩個物件，
// 就可以用 interface 來讓兩個相似的物件能有同樣的規格，但又不會過度緊密藕合。
// 例如 Email 和簡訊都有「通知」的性質，它們都是 "like a notifier"，因此可以如下定義：

interface INotifier {
  notify(message: string): void;
}

class EmailNotifier implements INotifier {
  notify(message: string): void { }
}

class SMSNotifier implements INotifier {
  notify(message: string): void { }
}

// Enum 可以用來做不可修改的常數的枚舉，提高程式可讀性

// 可以用在錯誤代碼、類別、日期等等，例如：

enum WeekDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

// 也可以用字串表示：
enum WeekDays {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday"
}


// 第 5 題

// React 會把同一個 event 裡的 setState 合併，來降低不必要的渲染，
// 所以最後只會 + 1 而不會 + 3。
// 想要讓三次 setState 都有效果，可以改成如下程式，讓每次的 count 都是基於上一次更新後的結果來計算：
// handleAddCount() {
//   this.setState((prevState) => ({ count: prevState.count + 1 }));
//   this.setState((prevState) => ({ count: prevState.count + 1 }));
//   this.setState((prevState) => ({ count: prevState.count + 1 }));
// }


// 第 6 題
function useDebounce(callback, delay) {
    const [debouncedFunction, setDebouncedFunction] = useState(callback);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFunction(() => callback);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);

    return debouncedFunction;
}

var SearchBox = React.createClass({
    render: function () {
        return <input type="search" name="p" onChange={this.handleOnChange} />;
    },

    handleOnChange: function (event) {
        const query = event.target.value;

        const debouncedSearch = useDebounce(() => this.makeAjaxCall(query), 300);
        debouncedSearch();
    },

    makeAjaxCall: function (query) {
        fetch(`https://a.b.com`)
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
});

