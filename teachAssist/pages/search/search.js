import React,{PureComponent} from 'react'
import {
    View,
    Text
} from 'react-native';
import styles from './style';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import HistoryList from '../../components/historyList/historylist';
// const SearchPage = ({navigation,route})=>{

//     route.params.setHide(false);


//     return (
//         <Text>SearchPage</Text>
//     )
// }



class SearchPage extends PureComponent{

    constructor(props){
        super(props);
        this.setHide = props.route.params.setHide;
        this.getBarState = props.route.params.getbarState;
        this.state={
            submitted:false,
            text:"",
            history:[]
        }
        
    }
    onChange=(text)=>{
        this.setState({text:text});
    }
    setHistory = async ()=>{
        try {
            await AsyncStorage.setItem('searchHistory',JSON.stringify(this.state.history));
          } catch (e) {
            // saving error
          }
    }
    getHistory = async () => {
        try{
            const searchHistory = await  AsyncStorage.getItem("searchHistory")
             if(searchHistory!==null)
                this.setState({history:JSON.parse(searchHistory)});
           
            
        }catch(errer){
            this.setState({history:[]})
        }
      }
    componentDidMount(){

        setTimeout(()=>{
            this._search.focus();
        },100)
        this.getHistory()
        this.setHide(false);
    }
    componentWillUnmount(){
         // insert into the history
        if(this.state.submitted && this.state.text !== ""){ 
            let isInsert = true;
            for(let i = 0; i< this.state.history.length; i++){
                if(this.state.text !== this.state.history[i]){
                    continue;
                }
                isInsert = false;
                break;
            }
            if(isInsert){
                if(this.state.history.length >= 10){
                    this.state.history.unshift(this.state.text);
                    this.state.history.pop();
                }else{
                    this.state.history.unshift(this.state.text)
                }
            }
        }
        // update the bottom bar state
        this.setHide(this.getBarState);
        // store the change
        this.setHistory()
    }
    render(){
        return (
            <View  style={{backgroundColor:'white',flex:1}} >

            <SearchBar
            platform="android"
            ref={search => this._search = search}
            lightTheme
            containerStyle={{backgroundColor:'white',borderWidth:0}}
            inputContainerStyle={{backgroundColor:'white',borderWidth:0}}
            keyboardType="web-search"
            inputStyle={{color:'black'}}
            onSubmitEditing={(event)=>{
                this.setState({submitted:true});
                this.props.navigation.navigate('TabScreen');
            } }
            placeholder="search for articles"
            onChangeText={this.onChange}
            value={this.state.text}
            onCancel={()=>{this.props.navigation.navigate('TabScreen')}}
            // cancelIcon={(<Text style={{right:0,position:'absolute'}}  >Cancel</Text>)}
            round={true}
            />
            <HistoryList    
            data={this.state.history}
            />
            </View>
        )
    }

}

export default SearchPage;
