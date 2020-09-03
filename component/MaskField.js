import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";


export default class MaskField extends Component {
    constructor(props){
        super(props);
        this.state={ mask: "", maskArray: [], maskDelimiter: ""};
    }
   
    componentDidMount(){
        this.setState({mask: this.props.mask, maskDelimiter: this.props.delimiter?this.props.delimiter: " "});    
       this.maskSet();
    }

    maskSet(){
        const arr=this.props.mask.split("[");
        var newArr=[];
        for(var i=1;i<arr.length;i++){
            
            var newStr=arr[i].substring(0, arr[i].indexOf("]"));
            newArr.push(newStr); 
        }
        
        this.setState({maskArray: newArr});
        // console.log(newArr);
    }

applyMaskOnInput=(value)=>{
    if(!value){
        this.props.onChangeText("");
    }
    var m1=this.state.maskArray;
    // console.log("value :", value.split(" ").join(""));
    var v1=value.split(" ").join("").split("");
    // filter kar rahay /,-,etc chars ko
     v1 = v1.filter(function (str) { 
         if(str.indexOf("(") !== -1 || str.indexOf(")") !== -1){
             //console.log("no filter");
            return "";
         }else if(str.indexOf("-") !== -1){
            return "";
         }else if(str.indexOf("/") !== -1 || str.indexOf("\\") !== -1){
            return "";
         }
         
         return str;
          });
//         we got str jis mai koi /,-, etc ni

     // console.log("v1: ", v1);    
    var del= this.state.maskDelimiter;
    var str="";
    var charAt= 0
   
        for (let j = 0; j < m1.length; j++) {
            
            // console.log("outer loop");
            // console.log("outer loop str: ", str);
            var maskindexLength=m1[j].length;
           // console.log("maskindexlength: ", maskindexLength);
           for(var i=0;i<maskindexLength;i++){
            //   console.log("inner loop str: ", str);
            // console.log("inner loop");
                if(i<(maskindexLength)){
                    // adding special characters
                    var n=m1[j].charAt(i);
                    if(isNaN(n)){
                        str=str+n;
                        continue;
                    }
                }
                if(v1.length>0)
               str=str+v1[charAt];
            //    if(i===(maskindexLength-1)){
            //     var n=m1[j].charAt(m1[j].length-1);
            //     if(isNaN(n)){
            //         str=str+n;
            //         continue;
            //     }
            //    }
               charAt++;
               if(charAt===v1.length || v1.length===0){
                //console.log("inner break str: ", str);
               // console.log("inner break");
                   break;
               }
           }
           if(charAt===v1.length || v1.length===0){
            //console.log("outer break str: ", str);
            // console.log("outer break");
            break;
        }
           //adding delimiter
           if(j===(m1.length-1)){
            // console.log("del ni karna");
           }else{
              //  console.log("del adding");
             str=str+del;
           }
        }
   
        //console.log("ending: ", str);
        if(str){
            if(v1.length===0){
               // console.log("empty");
                str="";
            }
            this.props.onChangeText(str.toString());
        }else{
            this.props.onChangeText("");
        }
    
}
    
  render() {
    return (
        <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {this.props.countryCode?(<View style={[{padding: 5, height: 40, backgroundColor: "lightgrey", justifyContent: "center",alignItems: "center",},this.props.countryCodeContainerStyle]}>
    <Text style={[{textAlign: "center",paddingBottom: 2 }, this.props.countryCodeTextStyle]}>{this.props.countryCode}</Text>
            </View>):null}
      <TextInput
      { ...this.props}
        value={this.props.value}
        onChangeText={(value) => {
         this.applyMaskOnInput(value);
        }}
        
       keyboardType={this.props.keyboardType?this.props.keyboardType: "numeric"}
        style={[
          {
            height: 40,
            width: 150,
           paddingLeft: 3,
            borderColor: "grey",
            borderWidth: 1,
            color: "blue"
          },this.props.style?this.props.style:null
        ]}
        underlineColorAndroid={this.props.underlineColorAndroid?this.props.underlineColorAndroid: "transparent"}
        spellCheck={false}
        autoCorrect={false}
        autoCompleteType="off"
        onFocus={()=>{ this.props.onFocus?this.props.onFocus:null}}
      
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textfieldborder: {
    borderLeftWidth: 0,
  },
});
