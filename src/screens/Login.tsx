import React from "react";

import { View, Text, SafeAreaView, TextInput } from "react-native";

function Login(){
    return(
        <SafeAreaView>
            <View>
                <Text>
                    Login
                </Text>
                <View>
                    <Text>
                        Username
                    </Text>
                    
                    <TextInput>

                    </TextInput>
                    
                    <Text>
                        Password
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login