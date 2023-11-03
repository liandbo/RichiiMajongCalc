import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import TileName from './tileName';

const Tile = ({ name, list, index, remove }) => {
    const drawTile = (nTile) => {
        switch (nTile) {
            //man
            case TileName.Man1:
                return <Image source={require('../assets/Man1.png')} style={styles.ImageTiles} />
            case TileName.Man2:
                return <Image source={require('../assets/Man2.png')} style={styles.ImageTiles} />
            case TileName.Man3:
                return <Image source={require('../assets/Man3.png')} style={styles.ImageTiles} />
            case TileName.Man4:
                return <Image source={require('../assets/Man4.png')} style={styles.ImageTiles} />
            case TileName.Man5:
                return <Image source={require('../assets/Man5.png')} style={styles.ImageTiles} />
            case TileName.Man6:
                return <Image source={require('../assets/Man6.png')} style={styles.ImageTiles} />
            case TileName.Man7:
                return <Image source={require('../assets/Man7.png')} style={styles.ImageTiles} />
            case TileName.Man8:
                return <Image source={require('../assets/Man8.png')} style={styles.ImageTiles} />
            case TileName.Man9:
                return <Image source={require('../assets/Man9.png')} style={styles.ImageTiles} />
            //pin
            case TileName.Pin1:
                return <Image source={require('../assets/Pin1.png')} style={styles.ImageTiles} />
            case TileName.Pin2:
                return <Image source={require('../assets/Pin2.png')} style={styles.ImageTiles} />
            case TileName.Pin3:
                return <Image source={require('../assets/Pin3.png')} style={styles.ImageTiles} />
            case TileName.Pin4:
                return <Image source={require('../assets/Pin4.png')} style={styles.ImageTiles} />
            case TileName.Pin5:
                return <Image source={require('../assets/Pin5.png')} style={styles.ImageTiles} />
            case TileName.Pin6:
                return <Image source={require('../assets/Pin6.png')} style={styles.ImageTiles} />
            case TileName.Pin7:
                return <Image source={require('../assets/Pin7.png')} style={styles.ImageTiles} />
            case TileName.Pin8:
                return <Image source={require('../assets/Pin8.png')} style={styles.ImageTiles} />
            case TileName.Pin9:
                return <Image source={require('../assets/Pin9.png')} style={styles.ImageTiles} />
            //tree
            case TileName.Tree1:
                return <Image source={require('../assets/Sou1.png')} style={styles.ImageTiles} />
            case TileName.Tree2:
                return <Image source={require('../assets/Sou2.png')} style={styles.ImageTiles} />
            case TileName.Tree3:
                return <Image source={require('../assets/Sou3.png')} style={styles.ImageTiles} />
            case TileName.Tree4:
                return <Image source={require('../assets/Sou4.png')} style={styles.ImageTiles} />
            case TileName.Tree5:
                return <Image source={require('../assets/Sou5.png')} style={styles.ImageTiles} />
            case TileName.Tree6:
                return <Image source={require('../assets/Sou6.png')} style={styles.ImageTiles} />
            case TileName.Tree7:
                return <Image source={require('../assets/Sou7.png')} style={styles.ImageTiles} />
            case TileName.Tree8:
                return <Image source={require('../assets/Sou8.png')} style={styles.ImageTiles} />
            case TileName.Tree9:
                return <Image source={require('../assets/Sou9.png')} style={styles.ImageTiles} />
            //direction
            case TileName.West:
                return <Image source={require('../assets/Shaa.png')} style={styles.ImageTiles} />
            case TileName.East:
                return <Image source={require('../assets/Ton.png')} style={styles.ImageTiles} />
            case TileName.South:
                return <Image source={require('../assets/Nan.png')} style={styles.ImageTiles} />
            case TileName.North:
                return <Image source={require('../assets/Pei.png')} style={styles.ImageTiles} />
            //dragon
            case TileName.Red:
                return <Image source={require('../assets/Chun.png')} style={styles.ImageTiles} />
            case TileName.Green:
                return <Image source={require('../assets/Hatsu.png')} style={styles.ImageTiles} />
            case TileName.White:
                return <Image source={require('../assets/Front.png')} style={styles.ImageTiles} />
            //default
            default:
                return <Image source={require('../assets/Back.png')} style={styles.ImageTiles} />
        }
    }

    return (
        <Pressable style={styles.aTile} onPress={() => remove(list, index)}>
            {drawTile(name)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    aTile: {
        height: 40,
        width: 30,
        backgroundColor: "#fff",
        margin: 4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    ImageTiles: {
        height: 35,
        width: 25
    }
});

export default Tile;