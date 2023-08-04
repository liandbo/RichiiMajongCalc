import { StyleSheet,View, Button } from "react-native"

const ResultPage = ({list1, list2, menzhen, ron, richii, doublerichii, ippatsu, chankan, rishan, haitei, seat, prevalent, dora, bonus, closeModal}) => {



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