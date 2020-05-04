import React,{PureComponent} from 'react'
import {
    View,
    ScrollView,
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
    setText = (text)=>{
        this.setState({text:text});
        
        global.search.keyWord = text;
        setTimeout(()=>{
            this.props.navigation.goBack();
        },100)
       
    }
    componentDidMount(){

        
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
            <ScrollView  keyboardShouldPersistTaps='handled'  style={{backgroundColor:'white',marginTop:20,flex:1}} 
         
         showsVerticalScrollIndicator={false}
            >

            <SearchBar
            platform="android"
            autoFocus={true}
            ref={search => this._search = search}
            lightTheme
            containerStyle={{backgroundColor:'white',borderWidth:0}}
            inputContainerStyle={{backgroundColor:'white',borderWidth:0}}
            keyboardType="web-search"
            returnKeyType='search'
            value={this.state.text}
            
            inputStyle={{color:'black'}}
            onSubmitEditing={(event)=>{
                this.setState({submitted:true});
                global.search.keyWord = event.nativeEvent.text;
                this.props.navigation.goBack();
            } }
            placeholder="search for articles"
            onChangeText={this.onChange}
            value={this.state.text}
            onCancel={()=>{ this.props.navigation.goBack();}}
            // cancelIcon={(<Text style={{right:0,position:'absolute'}}  >Cancel</Text>)}
            round={true}
            />
            <HistoryList    
            data={this.state.history}
            setText={this.setText}
            />
            </ScrollView>
        )
    }

}

export default SearchPage;
