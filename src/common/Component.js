import _ from "lodash"
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export const InputField = (props) => {
    
    return(
        <>
        <View style={{flexDirection: 'row', paddingTop: 10}}>
            <Text style={{flex: 1,}}>{_.startCase(props.name)}: </Text>
            <TextInput onChangeText={props.onChange} value={props.value} numberOfLines={props.line ?? 1} multiline={props.textarea ?? false} placeholder={_.startCase(props.name)} secureTextEntry={props.password ? true : false} style={{flex: 3, borderWidth: 1, paddingLeft: 10}} />
        </View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}></Text>
            <Text style={{flex: 3, color: 'red'}}>{props.error ?? ''}</Text>
        </View>
        </>
    )
}

export const ButtomAuthPage = (props) => {
    
    return(
        <>
        <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity style={{flex: 1}}>
            <Text style={{color: '#20bcef', fontWeight: 'bold'}}></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.navRight}>
            <Text style={{flex: 1, textAlign: 'right', color: '#20bcef', fontWeight: 'bold'}}>{props.rightText}</Text>
        </TouchableOpacity>
    </View>
        </>
    )
}

