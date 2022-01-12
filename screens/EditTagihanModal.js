import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';

const EditTagihanModal = (props) => {
    let {isOpen, selectedTagihan, updateTagihan, closeModal} = props;

    let [errorMessage, setErrorMessage] = useState(false);
    let [loading, setLoading] = useState(false);
    let [tagihan, setTagihan] = useState(null);
    let [totalBayar, setTotalBayar] = useState("0");
    let [sisaTagihan, setSisaTagihan] = useState("0")
    const theme = useTheme();

    useEffect(() => {
        if (selectedTagihan){
            setSisaTagihan(selectedTagihan.kbayar)
        }
        //getUsers()
    }, [])

    function getUsers () {
        setErrorMessage("")
        setLoading(true)
        fetch('https://yukimuraattachment.com/apisales/apipelangganku', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => {
              var result = [...tagihan, ...res];
              setTagihan(result)
              setLoading(false)
          })
          .catch(() => {
              setLoading(false)
              setErrorMessage("Network Error. Please try again cust.")
          })
      }
	  
	  
    function transaksiDone(id,kb){
      fetch(`https://yukimuraattachment.com/apisales/apieditanDataxxx?id_trans=${id}&kb=${kb}`, {
          method: "PUT",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              status: 2
          })
      })
      .then(res => res.json())
      .catch(e => {
        setIsLoading(false)
        setErrorMessage("Network Error. Please try again.")
      })

      //alert("Transaksi Selesai");
    }	  
	  

      function bayarTagihan () {
        const { id_user_trans, id_transaksi, kode_trans, total_harga,tgl_trans,kurang_bayar, id_sales , kbayar } = selectedTagihan;
        setErrorMessage("");
        setLoading(true);
		transaksiDone(id_transaksi,kbayar);
        alert("sukses");

        // if (kode_trans && total_harga && tgl_trans) {
        // selected Tagihan is updated with Tagihan id
        //fetch(`http://dummy.restapiexample.com/api/v1/update/${this.props.selectedTagihan.id}`, {
        //192.168.43.249
        //192.168.100.203
        fetch(`https://yukimuraattachment.com/apisales/apieditanDataz?id=${id_transaksi}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
				id_sales:id_sales,
				kode_trans:kode_trans,
				id_user_trans:id_user_trans,
                kurang_bayar: kbayar,
				total_harga: total_harga,
                totalbayar: totalBayar,
            })
        })
        .then(res => res.json())
        .then(res => {
                    closeModal();
                    updateTagihan({
						id_sales:res.id_sales,
						kode_trans:res.kode_trans,
						id_user_trans:res.id_user_trans,
                        kurang_bayar: res.kurang_bayar,
						total_harga: res.total_harga,
                        totalbayar: res.totalbayar
                    });
        })
        .catch(e => {
            setLoading(false)
            setErrorMessage("Network Error. Please try again new.")
        })
    }

    return(
        <Modal
            visible={isOpen}
            onRequestClose={closeModal}
            animationType="slide"
        >
            <SafeAreaView>
                <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
            </SafeAreaView>
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>Tagihan</Text>

                    <View style={styles.contentContainer}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>ID Transaksi</Text>
                            <Text style={styles.value}>{selectedTagihan.id_transaksi} {selectedTagihan.id_sales} {selectedTagihan.id_user_trans}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Kode Transaksi</Text>
                            <Text style={styles.value}>{selectedTagihan.kode_trans}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Tanggal Transaksi</Text>
                            <Text style={styles.value}>{selectedTagihan.tgl_trans}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Tanggal Bayar</Text>
                            <Text style={styles.value}>{selectedTagihan.tgl_trans}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Total harga</Text>
                            <Text style={styles.value}>{selectedTagihan.total_harga}</Text>
                        </View>
						
						<View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Kurang Bayar</Text>
                            <Text style={styles.value}>{selectedTagihan.kbayar}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Total Bayar</Text>
                            <TextInput
                                value={totalBayar}
                                keyboardType="numeric"
                                style={styles.textBox}
                                onChangeText={(val) => {
                                    var bayar = val ? parseInt(val) : 0;
                                    var tagihan = parseInt(selectedTagihan.kbayar);
                                    var sisa = tagihan-bayar;

                                    setTotalBayar(val)
                                    setSisaTagihan(sisa)
                                }}/>
                        </View>
                        
                        <Text style={styles.title}>Sisa Tagihan : {sisaTagihan}</Text>

                        {loading ? <Text
                            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                                style={styles.message}>{errorMessage}</Text> : null}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => bayarTagihan()}
                                style={{ ...styles.button, marginVertical: 0 }}>
                                <Text style={styles.buttonText}>Bayar</Text>
                            </TouchableOpacity>

                                

                            <TouchableOpacity
                                onPress={closeModal}
                                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default EditTagihanModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    contentContainer: {width: '100%', marginTop: 20},
    itemContainer: {width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderBottomColor: '#DEDEDE'
    },
    titleName: {
        fontSize: 16,
        fontWeight: '500'
    },
    value: {
        fontSize: 16,
        color: 'grey'
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        width: '50%',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        fontSize: 18,
        padding: 10,
        textAlign: 'right'
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    },
    containerx: {
        height:250,
        padding:20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      itemx: {
        marginBottom: 2,
        marginVertical: 0, 
        marginLeft: 10,
        width: '50%' // is 50% of container width
      },
      dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    dropdown2: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 20,
        padding: 8,
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },


})