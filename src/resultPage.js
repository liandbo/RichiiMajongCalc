import { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native"

const ResultPage = ({ list1, list2, menzhen, ron, richii, doublerichii, ippatsu, chankan, rishan, haitei, seat, prevalent, dora, bonus, closeModal }) => {

    const [list, setList] = useState([...list1, ...list2]);

    const [han, setHan] = useState(0);
    const [fu, setFu] = useState(0);

    useEffect(() => {
        sortChess([...list]);
    }, []);

    const sortChess = (li) => {
        const fullarr = [...li];
        const [arr, kan] = getKan(li);
        const [arr2, pon] = getPon(arr);
        console.log(arr2)
        console.log(pon)
        // const [arr, pair] = getPair(li);
    };

    const getKan = (li) => {
        if (li.length > 0) {
            const list = [...li];
            const kanlist = [];
            li.map(value => {
                if (list.filter(findV => findV == value).length == 4) {
                    if (!kanlist.includes(value)) {
                        kanlist.push(value)
                    }
                }
            });
            kanlist.map(remove => {
                while (true) {
                    const index = list.indexOf(remove);
                    if (index !== -1) {
                        list.splice(index, 1);
                    } else {
                        break;
                    }
                }
            });
            return [list, kanlist];
        } else {
            return [[], []];
        }
    };

    const getPon = (li) => {
        if (li.length > 0) {
            const list = [...li];
            const ponlist = [];
            li.map(value => {
                if (list.filter(findV => findV == value).length == 3) {
                    if (!ponlist.includes(value)) {
                        ponlist.push(value)
                    }
                }
            });
            ponlist.map(remove => {
                while (true) {
                    const index = list.indexOf(remove);
                    if (index !== -1) {
                        list.splice(index, 1);
                    } else {
                        break;
                    }
                }
            });
            return [list, ponlist];
        } else {
            return [[], []];
        }
    };

    const getPair = (li) => {
        let list = [...li];



        return [list, [kan]];
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.tileView}>

            </View>
            <View style={styles.middleView}>

            </View>
            <View style={styles.closeBtnBtn}>
                <Button
                    title='Close'
                    onPress={closeModal}
                    color='#4B4B4B'
                />
            </View>
        </View>
    )
}

export default ResultPage;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    tileView: {
        height: 250,
        backgroundColor: '#8EF0FF',
        borderBottomWidth: 5,
        borderBottomColor: "black",
    },
    middleView: {
        height: 526,
    },
    closeBtnBtn: {
        width: 100,
        alignSelf: 'center'
    },
})