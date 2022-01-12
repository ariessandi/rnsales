import React, {useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { useTheme } from '@react-navigation/native';

const EditEmployeeModal = (props) => {
    let {isOpen, selectedData, closeModal, submitAction, selectedCustomer, salesId} = props;
    let [salesList, setSalesList] = useState([])
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("")
    let [qty, setQty] = useState(0)
    let [maxQty, setMaxQty] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        let {qtyy} = selectedData;
        if (qtyy && qtyy > 0){
            setMaxQty(parseInt(qtyy))
        }
        // getSalesList()
    }, [])

    function getSalesList(){
        setLoading(true)
        setErrorMessage("")
        fetch('https://yukimuraattachment.com/apisales/apipelangganku', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => {
              setSalesList(res)
              setLoading(false)
          })
          .catch(() => {
              setLoading(false)
              setErrorMessage("Network Error. Please try again xx.")
          })
      }

    function submitProduct(){	
        setLoading(true)
        setErrorMessage("")
        fetch("https://yukimuraattachment.com/apisales/apiinputanData", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    id_produk: selectedData.id_produk,
                    harga: selectedData.harga,
                    id_sales:salesId,
					id_user_trans: selectedCustomer.id_user_trans,
                    qty: qty
            })
        })
        .then(res => res.json())
        .then(res => {
                closeModal();
                console.log(res)
                submitAction({
                    id_produk: selectedData.id_produk,
                    qty: qty,
                    harga: selectedData.harga,
                    id_sales: salesId,
					id_user_trans:selectedCustomer.id_user_trans,
                    id: selectedData.id_transaksi
                })
        })                
        .catch(error => {
            setLoading(false);
            setErrorMessage("tes :"+error)
        });
    }

    return (
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
                    <Text style={styles.title}>Tambah Produk</Text>

                    <View style={styles.contentContainer}> 
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Nama Customer</Text>
                            <Text style={styles.value}>{selectedCustomer.username}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Produk ID</Text>
                            <Text style={styles.value}>{selectedData.id_produk}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Nama Produk</Text>
                            <Text style={styles.value}>{selectedData.nama_produk}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Harga</Text>
                            <Text style={styles.value}>{selectedData.price}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.titleName}>Kuantitas</Text>
                            <InputSpinner            
                                rounded={true}
                                width={130}
                                height={30}
                                max={maxQty}
                                min={0}
                                step={1}
                                buttonLeftDisabled={qty === 0}
                                buttonRightDisabled={qty === maxQty}
                                colorLeft={qty === 0 ? 'grey' : "#f04048"}
                                colorRight={qty === maxQty ? 'grey' : "#f04048"}
                                value={qty}
                                onChange={item => setQty(item)}
                            />
                        </View>

                        {loading ? <Text
                            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                                style={styles.message}>{errorMessage}</Text> : null}

                        <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            onPress={() => {
                                if (qty > 0){
                                    submitProduct()
                                } else {
                                    var message = qty === 0 ? "Kuantitas harus lebih besar dari 0" : ""
                                    alert(message)
                                }
                                
                            }}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}
export default EditEmployeeModal;

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
        paddingHorizontal: 10,
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
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
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
          width: '50%'
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