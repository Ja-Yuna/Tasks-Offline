import React, { Component} from 'react'
import { Modal,
         View, 
         StyleSheet, 
         Text, 
         TouchableWithoutFeedback, 
         TouchableOpacity, 
         TextInput,
         Platform} from 'react-native'


import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyle from '../commonStyle'
import moment from 'moment'
 const initialState = { desc: '', date: new Date(), showDatePicker: false}


export default class AddTask extends Component {
    state = {
        ...initialState
    }
    save = () => {
        const newTask= {
            desc: this.state.desc,
            date: this.state.date
        }
        
            this.props.onSave && this.props.onSave(newTask)
            this.setState({ ...initialState})
    }
    getDatePicker =() => {
        let datePicker = <DateTimePicker value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode='date'/>

        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')
        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={()=> this.setState({showDatePicker:true})}>
                        <Text style={styles.date}>
                        {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }
   render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType= 'slide'>
                <TouchableWithoutFeedback
                onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>New Task</Text>
                    <TextInput style={styles.input}
                    placeholder = "Enter Information"
                    onChangeText={desc => this.setState({desc})}
                    value={this.state.desc}/>
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableWithoutFeedback
                onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'

    },
    header: {
        fontFamily: commonStyle.fontFamily,
        backgroundColor: commonStyle.colors.today,
        color: commonStyle.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyle.colors.today
    }, 
    input:  {
        fontFamily: commonStyle.fontFamily,
        height: 40,
        margin: 15,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})