import { Alert, Button, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AudioFormStyles from "../AudioUpload/Style";
import { addNewAudio, addNewText } from "../../../utils/audio";
import { audioData } from "../../../types";
import UploadButton from "../AudioUpload/UploadButton";
import InputItem from "../AudioUpload/InputItem";
import { useState } from "react";

export default function UploadText() {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('')
  const audioInputSchema = Yup.object().shape({
    //textMethod: Yup.string().required('Required'),
    text: Yup.string().required('Required'),
  });

  const onSubmitForm = async (value: { text: string }) => {
    await addNewText(value).then(data => {
      if (data?.status == 200) {
        //Alert.alert('Successfully added');
        setMessage('Successfully added text');
      }
      else if (data?.status == 401) {
        //Alert.alert("You need permission to add new audio");
        setMessage("You need permission to add new text");
      }
      else {
        //Alert.alert("Unknown error");
        setMessage("Unknown error");
      }
    })
    setModalVisible(!modalVisible);
  }

  return (
    <ScrollView style={AudioFormStyles.screen}>

       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={AudioFormStyles.centeredView}>
          <View style={AudioFormStyles.modalView}>
            <Text style={AudioFormStyles.modalText}>{message}</Text>
            <Pressable
              style={[AudioFormStyles.button, AudioFormStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={AudioFormStyles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image resizeMode="stretch" style={AudioFormStyles.image} source={require('../../../assets/bgpro.png')} />
      <View style={AudioFormStyles.topField}>
        <Text style={AudioFormStyles.title}>Text upload</Text>
      </View>
      <View style={AudioFormStyles.inputField}>
        <Formik
          initialValues={{ text: '' }}
          validationSchema={audioInputSchema}
          onSubmit={values => { onSubmitForm(values) }}
        >
          {({ handleChange, handleBlur, errors, handleSubmit, values }) => (
            <View>

              <InputItem label={'Text'} target={'text'} error={errors.text} value={values.text} handleChange={handleChange} handleBlur={handleBlur}></InputItem>

              <Button
                onPress={() => handleSubmit()}
                title="Submit"
              />

            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}