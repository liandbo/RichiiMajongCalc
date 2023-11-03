import { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList, Pressable, TouchableHighlight, Modal } from 'react-native';
import Tile from './src/tiles';
import TileName from './src/tileName';
import ResultPage from './src/resultPage';

const App = () => {
    const [tileList1, setTileList1] = useState([]);
    const [tileList2, setTileList2] = useState([]);

    const [navi, setNavi] = useState(1);
    const [menzenchin, setMenzenchin] = useState(1); // 0 closed, 1 opened
    const [ron, setRon] = useState(1); // 0 tsumo, 1 ron

    const [a1, setA1] = useState(0); //0 not richii, 1 richii
    const [a2, setA2] = useState(0); //0 not double richii, 1 double richii
    const [b1, setB1] = useState(0); //0 not ippatsu, 1 ippatsu
    const [b2, setB2] = useState(0); //0 not chankan, 1 chankan
    const [c1, setC1] = useState(0); //0 not rishan kaihou, 1 rishan kaihou
    const [c2, setC2] = useState(0); //0 not haitei, 1 haitei

    const [seatWind, setSeatWind] = useState(0); // 0 east, 1 south, 2 west, 3 north
    const [prevalentWind, setPrevalentWind] = useState(0); // 0 east, 1 south, 2 west, 3 north
    const [dora, setDora] = useState(0);
    const [bonus, setBonus] = useState(0);

    const [showModal, setShowModal] = useState(false); // false invi, true show
 

    const onClearPress = () => {
        setTileList1([]);
        setTileList2([]);
    }

    const naviPress = (key) => {
        setNavi(key);
    }

    const naviAreaStyle = (key) => {
        return key == navi ? styles.naviAreaUp : styles.naviAreaDown;
    }

    const isHiddenView = (key) => {
        return key == navi ? styles.showContentView : styles.hiddenContentView;
    }

    const closedPress = () => {
        setMenzenchin(0);
    }

    const openedPress = () => {
        setMenzenchin(1);
        setA1(0);
        setA2(0);
        setB1(0);
    }

    const menzenchinStyle = (key) => {
        return key == menzenchin ? styles.toggleUp : styles.toggleDown;
    }

    const ronPress = () => {
        setRon(1);
    }

    const tsumoPress = () => {
        setRon(0);
        setB2(0);
    }

    const rontsumoStyle = (key) => {
        return key == ron ? styles.toggleUp : styles.toggleDown;
    }

    const chooseStyle = (key) => {
        return key == 0 ? styles.chooseBtnUp : styles.chooseBtnDown;
    }

    const onChoosePress = (key, set, opposite, up, down) => { // opposite turn down when up, up turn up when up, down turn down when down
        if (key == 0) {
            set(1);
            opposite.map(o => {
                o(0);
            });
            up && up.map(u => {
                u(1);
            });
        } else {
            set(0);
            down && down.map(d => {
                d(0);
            });
        }
    }

    const onIppatsuPress = () => {
        if (b1 == 0) {
            setB1(1);
            setMenzenchin(0);
            if (a1 == 0 && a2 == 0) {
                setA1(1);
            }
        } else {
            setB1(0);
        }
    }

    const onSeatWindPress = (key) => {
        setSeatWind(key);
    }

    const onPrevalentWindPress = (key) => {
        setPrevalentWind(key);
    }

    const windStyle = (key, wind) => {
        return key == wind ? styles.windPressDown : styles.windPressUp;
    }

    const addDora = () => {
        let d = dora;
        if (dora != 40) setDora(d + 1);
    }

    const minusDora = () => {
        let d = dora;
        if (d != 0) setDora(d - 1);
    }

    const minusBonus = () => {
        let b = bonus;
        if (b != 0) setBonus(b - 300);
    }

    const addBonus = () => {
        let b = bonus;
        setBonus(b + 300);
    }

    const addTile = (tile) => {
        let num = 0;
        tileList1.map(i => {
            if (tile == i) num++;
        });
        tileList2.map(i => {
            if (tile == i) num++;
        });
        if (num != 4) {
            if (tileList2.length != 8) {
                if (tileList1.length != 8) {
                    setTileList1([...tileList1, tile]);
                } else {
                    setTileList2([...tileList2, tile]);
                }
            }
        }
    }

    const onRemovePress = (list, index) => {
        let tile1 = [...tileList1];
        let tile2 = [...tileList2];
        if (list == 0) {
            tile1.splice(index, 1);
            if (tile2.length != 0) {
                let first = tile2.shift();
                setTileList1([...tile1, first]);
                setTileList2([...tile2]);
            } else {
                setTileList1([...tile1]);
            }
        } else {
            tile2.splice(index, 1);
            setTileList2([...tile2]);
        }
    }

    const onResultPress = () => {
        setShowModal(true);
    }

    const onCloseModalPress = () => {
        setShowModal(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainview}>
                <View style={styles.chessView}>
                    <FlatList
                        data={tileList1}
                        renderItem={({ item, index }) => <Tile name={item} list={0} index={index} remove={onRemovePress} />}
                        keyExtractor={(item, index) => "a"+ index}
                        horizontal={true}
                    />
                    <FlatList
                        data={tileList2}
                        renderItem={({ item, index }) => <Tile name={item} list={1} index={index} key={"b" + index} remove={onRemovePress} />}
                        keyExtractor={(item, index) => "b"+ index}
                        horizontal={true}
                    />
                </View>
                <View style={styles.buttonView}>
                    <Button
                        onPress={onClearPress}
                        title="Clear"
                        color="#4B4B4B"
                    />
                </View>
            </View>
            <View style={styles.middleView}>
                <View style={styles.navigateBar}>
                    <Pressable key={1} onPress={() => naviPress(1)} style={naviAreaStyle(1)}>
                        <Text style={styles.conditionFont}>Tiles</Text>
                    </Pressable>
                    <Pressable key={2} onPress={() => naviPress(2)} style={naviAreaStyle(2)}>
                        <Text style={styles.conditionFont}>Condition</Text>
                    </Pressable>
                    <Pressable key={3} onPress={() => naviPress(3)} style={naviAreaStyle(3)}>
                        <Text style={styles.conditionFont}>Wind $ Dora</Text>
                    </Pressable>
                </View>
                <View style={styles.contentView}>
                    <View key={1} style={isHiddenView(1)}>
                        <View style={styles.tileRow}>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man1)}>
                                <Image source={require('./assets/Man1.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man2)}>
                                <Image source={require('./assets/Man2.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man3)}>
                                <Image source={require('./assets/Man3.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man4)}>
                                <Image source={require('./assets/Man4.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man5)}>
                                <Image source={require('./assets/Man5.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man6)}>
                                <Image source={require('./assets/Man6.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man7)}>
                                <Image source={require('./assets/Man7.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man8)}>
                                <Image source={require('./assets/Man8.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Man9)}>
                                <Image source={require('./assets/Man9.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tileRow}>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin1)}>
                                <Image source={require('./assets/Pin1.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin2)}>
                                <Image source={require('./assets/Pin2.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin3)}>
                                <Image source={require('./assets/Pin3.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin4)}>
                                <Image source={require('./assets/Pin4.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin5)}>
                                <Image source={require('./assets/Pin5.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin6)}>
                                <Image source={require('./assets/Pin6.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin7)}>
                                <Image source={require('./assets/Pin7.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin8)}>
                                <Image source={require('./assets/Pin8.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Pin9)}>
                                <Image source={require('./assets/Pin9.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tileRow}>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree1)}>
                                <Image source={require('./assets/Sou1.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree2)}>
                                <Image source={require('./assets/Sou2.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree3)}>
                                <Image source={require('./assets/Sou3.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree4)}>
                                <Image source={require('./assets/Sou4.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree5)}>
                                <Image source={require('./assets/Sou5.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree6)}>
                                <Image source={require('./assets/Sou6.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree7)}>
                                <Image source={require('./assets/Sou7.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree8)}>
                                <Image source={require('./assets/Sou8.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Tree9)}>
                                <Image source={require('./assets/Sou9.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tileRow}>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.East)}>
                                <Image source={require('./assets/Ton.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.South)}>
                                <Image source={require('./assets/Nan.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.West)}>
                                <Image source={require('./assets/Shaa.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.North)}>
                                <Image source={require('./assets/Pei.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Red)}>
                                <Image source={require('./assets/Chun.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.White)}>
                                <Image source={require('./assets/Front.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.tileChess} underlayColor={'#66BEFD'} onPress={() => addTile(TileName.Green)}>
                                <Image source={require('./assets/Hatsu.png')} style={styles.ImageTiles} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <View key={2} style={isHiddenView(2)}>
                        <View style={styles.toggleArea}>
                            <Pressable style={menzenchinStyle(1)} onPress={openedPress}>
                                <Text style={styles.conditionFont}>Opened</Text>
                            </Pressable>
                            <Pressable style={menzenchinStyle(0)} onPress={closedPress}>
                                <Text style={styles.conditionFont}>Closed</Text>
                            </Pressable>
                        </View>
                        <View style={styles.toggleArea}>
                            <Pressable style={rontsumoStyle(1)} onPress={(ronPress)}>
                                <Text style={styles.conditionFont}>Ron</Text>
                            </Pressable>
                            <Pressable style={rontsumoStyle(0)} onPress={tsumoPress}>
                                <Text style={styles.conditionFont}>Tsumo</Text>
                            </Pressable>
                        </View>
                        <View style={styles.hr} />
                        {/* --------------------------------------------------------------------------------------------------- */}
                        <View style={styles.chooseArea}>
                            <View style={styles.chooseRow}>
                                <Pressable style={chooseStyle(a1)} onPress={() => onChoosePress(a1, setA1, [setA2, setMenzenchin], [], [setB1])}>
                                    <Text style={styles.conditionFont}>Richii</Text>
                                </Pressable>
                                <Pressable style={chooseStyle(a2)} onPress={() => onChoosePress(a2, setA2, [setA1, setMenzenchin], [], [setB1])}>
                                    <Text style={styles.conditionFont}>Double Richii</Text>
                                </Pressable>
                            </View>
                            <View style={styles.chooseRow}>
                                <Pressable style={chooseStyle(b1)} onPress={() => onIppatsuPress()}>
                                    <Text style={styles.conditionFont}>Ippatsu</Text>
                                </Pressable>
                                <Pressable style={chooseStyle(b2)} onPress={() => onChoosePress(b2, setB2, [setC1, setC2], [setRon])}>
                                    <Text style={styles.conditionFont}>Chankan</Text>
                                </Pressable>
                            </View>
                            <View style={styles.chooseRow}>
                                <Pressable style={chooseStyle(c1)} onPress={() => onChoosePress(c1, setC1, [setC2, setB2, setRon])}>
                                    <Text style={styles.conditionFont}>Rinshan Kaihou</Text>
                                </Pressable>
                                <Pressable style={chooseStyle(c2)} onPress={() => onChoosePress(c2, setC2, [setC1, setB2])}>
                                    <Text style={styles.conditionFont}>Haitei/Houtei</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <View key={3} style={isHiddenView(3)}>
                        <View style={styles.wdRow}>
                            <View style={styles.wdLabel}>
                                <Text style={styles.labelText}>Seat</Text>
                            </View>
                            <View style={styles.wdConfig}>
                                <Pressable style={windStyle(0, seatWind)} onPress={() => onSeatWindPress(0)}>
                                    <Image source={require('./assets/Ton.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(1, seatWind)} onPress={() => onSeatWindPress(1)}>
                                    <Image source={require('./assets/Nan.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(2, seatWind)} onPress={() => onSeatWindPress(2)}>
                                    <Image source={require('./assets/Shaa.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(3, seatWind)} onPress={() => onSeatWindPress(3)}>
                                    <Image source={require('./assets/Pei.png')} style={styles.ImageTiles} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.wdRow}>
                            <View style={styles.wdLabel}>
                                <Text style={styles.labelText}>Prevalent</Text>
                            </View>
                            <View style={styles.wdConfig}>
                                <Pressable style={windStyle(0, prevalentWind)} onPress={() => onPrevalentWindPress(0)}>
                                    <Image source={require('./assets/Ton.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(1, prevalentWind)} onPress={() => onPrevalentWindPress(1)}>
                                    <Image source={require('./assets/Nan.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(2, prevalentWind)} onPress={() => onPrevalentWindPress(2)}>
                                    <Image source={require('./assets/Shaa.png')} style={styles.ImageTiles} />
                                </Pressable>
                                <Pressable style={windStyle(3, prevalentWind)} onPress={() => onPrevalentWindPress(3)}>
                                    <Image source={require('./assets/Pei.png')} style={styles.ImageTiles} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.wdRow}>
                            <View style={styles.wdLabel}>
                                <Text style={styles.labelText}>Dora</Text>
                            </View>
                            <View style={styles.wdConfig}>
                                <TouchableHighlight style={styles.addMinusStyle} underlayColor={'#66BEFD'} onPress={() => minusDora()}>
                                    <Text style={styles.symbolText}> - </Text>
                                </TouchableHighlight>
                                <View style={styles.pointShow}>
                                    <Text style={styles.symbolText}>{dora}</Text>
                                </View>
                                <TouchableHighlight style={styles.addMinusStyle} underlayColor={'#66BEFD'} onPress={() => addDora()}>
                                    <Text style={styles.symbolText}> + </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.wdRow}>
                            <View style={styles.wdLabel}>
                                <Text style={styles.labelText}>Bonus</Text>
                            </View>
                            <View style={styles.wdConfig}>
                                <TouchableHighlight style={styles.addMinusStyle} underlayColor={'#66BEFD'} onPress={() => minusBonus()}>
                                    <Text style={styles.symbolText}> - </Text>
                                </TouchableHighlight>
                                <View style={styles.pointShow}>
                                    <Text style={styles.symbolText}>{bonus}</Text>
                                </View>
                                <TouchableHighlight style={styles.addMinusStyle} underlayColor={'#66BEFD'} onPress={() => addBonus()}>
                                    <Text style={styles.symbolText}> + </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.resultBtn}>
                <Button
                    title='Result'
                    onPress={onResultPress}
                    color='#4B4B4B'
                />
            </View>
            <Modal
                animationType="none"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <ResultPage 
                        list1={tileList1}
                        list2={tileList2}
                        menzhen={menzenchin}
                        ron={ron}
                        richii={a1}
                        doublerichii={a2}
                        ippatsu={b1}
                        chankan={b2}
                        rishan={c1}
                        haitei={c2}
                        seat={seatWind}
                        prevalent={prevalentWind}
                        dora={dora}
                        bonus={bonus}
                        closeModal={onCloseModalPress}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    mainview: {
        backgroundColor: '#8EF0FF',
        height: 300,
        borderBottomWidth: 5,
        borderBottomColor: "black",
    },
    chessView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "85%",
        paddingTop: 100
    },
    buttonView: {
        width: 80,
        alignSelf: "center"
    },
    navigateBar: {
        height: 65,
        backgroundColor: "#C6C6C6",
        flexDirection: "row",
        justifyContent: "center"
    },
    conditionFont: {
        fontWeight: "800"
    },
    naviAreaUp: {
        height: 65,
        width: 130,
        borderBottomColor: "#fff",
        borderBottomWidth: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    naviAreaDown: {
        height: 65,
        width: 130,
        borderBottomColor: "#C6C6C6",
        borderBottomWidth: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    contentView: {
        paddingTop: 20,
        alignItems: "center",
        marginBottom: 20
    },
    showContentView: {
        display: 'flex'
    },
    hiddenContentView: {
        display: 'none'
    },
    toggleArea: {
        flexDirection: 'row',
        marginBottom: 20
    },
    toggleUp: {
        backgroundColor: '#66BEFD',
        width: 170,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleDown: {
        backgroundColor: '#E9E9E9',
        width: 170,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hr: {
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    chooseArea: {
        flexDirection: 'column'
    },
    chooseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    chooseBtnUp: {
        width: 165,
        backgroundColor: '#E9E9E9',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseBtnDown: {
        width: 165,
        backgroundColor: '#66BEFD',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wdRow: {
        flexDirection: 'row',
        marginBottom: 10,
        width: 340
    },
    wdLabel: {
        width: '40%',
        height: 55,
        justifyContent: 'center',
    },
    wdConfig: {
        width: '60%',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    labelText: {
        fontSize: 20,
        fontWeight: '500'
    },
    ImageTiles: {
        height: 50,
        width: 35,
    },
    windPressUp: {
        width: 51,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9E9E9'
    },
    windPressDown: {
        width: 51,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66BEFD'
    },
    addMinusStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 51,
        height: '100%',
        backgroundColor: '#E9E9E9'
    },
    symbolText: {
        fontSize: 40,
        fontWeight: '400'
    },
    pointShow: {
        width: 102,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tileRow: {
        flexDirection: 'row',
        marginBottom: 10,
        height: 65,
        width: 380,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tileChess: {
        backgroundColor: '#E9E9E9',
        padding: 2,
        borderRadius: 5
    },
    resultBtn: {
        width: 100,
        alignSelf: 'center'
    },
    middleView: {
        height: 500,
    },
});
