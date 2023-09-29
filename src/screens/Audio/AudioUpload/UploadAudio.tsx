import { useCallback, useState } from "react";
import { Alert, Button, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Formik } from "formik";
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

import AudioFormStyles from "./Style";
import { addNewAudio, cloudinaryUpload, requestStoragePermission } from "../../../utils/audio";
import { audioData } from "../../../types";
import UploadButton from "./UploadButton";
import InputItem from "./InputItem";

export default function UploadAudio() {
  const [fileResponse, setFileResponse] = useState<string>();

  const audioInputSchema = Yup.object().shape({
    //textMethod: Yup.string().required('Required'),
    text: Yup.number().required('Required'),
    audio: Yup.string().required('Required'),
    syncData: Yup.string().required('Required'),
    duration: Yup.number().required('Required')
  });

  const onFilePicker = () => {
    requestStoragePermission().then(response => {
      if(response){
        filePicker();
      }else{
        Alert.alert("The app need permission to achive your media")
      }
    });
  }
  const filePicker = useCallback(async () => {
    try {
      DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      }).then((file : any)=>{
        setFileResponse(file.at(0)?.uri)
        cloudinaryUpload(file.at(0));
      });
      
    } catch (err) {
      console.warn(err);
    }
  }, []);

  
  const onSubmitForm = (value: audioData) => {
    let result = addNewAudio(value);
    result.then(data => {
      if (data?.status == 200) {
        console.log("Successfully added audio");
      }
      else if (data?.status == 401) {
        console.log("You need permission to add new audio");
      }
      else {
        console.log("Unknown error")
      }
    })
  }

  return (
    <ScrollView style={AudioFormStyles.screen}>
      <Image resizeMode="stretch" style={AudioFormStyles.image} source={require('../../../assets/bgpro.png')} />
      <View style={AudioFormStyles.topField}>
        <Text style={AudioFormStyles.title}>Audio upload</Text>
      </View>
      <View style={AudioFormStyles.inputField}>
        <Formik
          initialValues={{ text: 0, audio: '', syncData: '', duration: 0 }}
          validationSchema={audioInputSchema}
          onSubmit={values => { onSubmitForm(values) }}
        >
          {({ handleChange, handleBlur, errors, handleSubmit, values }) => (
            <View>
              <UploadButton pressHandler={() => onFilePicker()} Icons={<FontAwesome name="upload" size={25} color={'black'}></FontAwesome>} />
              <StatusBar barStyle={'dark-content'} />
                <Text
                  style={AudioFormStyles.text}
                  numberOfLines={1}
                  ellipsizeMode={'middle'}>
                  {fileResponse}
                </Text>

              <InputItem label={'audio'} target={'audio'} error={errors.audio} value={values.audio} handleChange={handleChange} handleBlur={handleBlur}></InputItem>

              <InputItem label={'Text id'} target={'text'} error={errors.text} value={values.text} handleChange={handleChange} handleBlur={handleBlur}></InputItem>

              <InputItem label={'Sync data'} target={'syncData'} error={errors.syncData} value={values.syncData} handleChange={handleChange} handleBlur={handleBlur}></InputItem>

              <InputItem label={'Duration'} target={'duration'} error={errors.duration} value={values.duration} handleChange={handleChange} handleBlur={handleBlur}></InputItem>

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