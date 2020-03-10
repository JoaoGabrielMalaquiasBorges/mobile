import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';

export default class TweetHeader extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        });
    }
    
}