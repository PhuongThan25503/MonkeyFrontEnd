import { Alert, Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AudioFormStyles from "./Style";
import { addNewAudio } from "../../../utils/audio";
import { audioData } from "../../../types";
import UploadButton from "./UploadButton";

export default function UploadAudio() {
  const audioInputSchema = Yup.object().shape({
    //textMethod: Yup.string().required('Required'),
    text: Yup.number().required('Required'),
    audio: Yup.string().required('Required'),
    syncData: Yup.string().required('Required'),
    duration: Yup.number().required('Required')
  });

  const onSubmitForm = (value: audioData) => {
    let result = addNewAudio(value);
    result.then(data => {
      if (data?.status == 200) {
        console.log("Successfully added");
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
      <View style={AudioFormStyles.topField}>
        <Image resizeMode="repeat" style={AudioFormStyles.image} source={require('../../../assets/bgpro.png')} />
        <View style={AudioFormStyles.topDecor}>
        </View>
        <Text style={AudioFormStyles.title}>Audio upload</Text>
      </View>
      <View style={AudioFormStyles.inputField}>
        <Formik
          initialValues={{ text: 0, audio: '', syncData: '', duration: 0 }}
          validationSchema={audioInputSchema}
          onSubmit={values => {onSubmitForm(values)}}
        >
          {({ handleChange, handleBlur, errors, handleSubmit, values }) => (
            <View>
              <UploadButton pressHandler={()=>console.log("oke")} Icons={<FontAwesome name="cloud-download" size={25} color={'black'}></FontAwesome>}/>
              <Text style={AudioFormStyles.text}>Audio</Text>
              {errors.audio &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.audio}</Text>
              }
              <TextInput
                style={AudioFormStyles.input}
                onChangeText={handleChange('audio')}
                onBlur={handleBlur('audio')}
                value={values.audio}
              />

              <TouchableOpacity style={AudioFormStyles.optionButton}>
                <View>
                  <Text style={AudioFormStyles.text}>New Text</Text>
                </View>
              </TouchableOpacity>
              {errors.text &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.text}</Text>
              }
              <TextInput
                style={AudioFormStyles.input}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={ values.text.toString() }
              />

              <Text style={AudioFormStyles.text}>sync data</Text>
              {errors.syncData &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.syncData}</Text>
              }
              <TextInput
                style={AudioFormStyles.input}
                onChangeText={handleChange('syncData')}
                onBlur={handleBlur('syncData')}
                value={values.syncData}
              />
              <Text style={AudioFormStyles.text}>duration</Text>
              {errors.duration &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.duration}</Text>
              }
              <TextInput
                style={AudioFormStyles.input}
                onChangeText={handleChange('duration')}
                onBlur={handleBlur('duration')}
                value={values.duration.toString()}
              />
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