import React from 'react'
import { View, Text } from 'react-native'
import Icon from './CustomIcon'

function TweetFooter ({ created_at }) {
    const time = 
        created_at.substring(11, 13) > '12'
            ? created_at.substring(11, 13) - '12' + created_at.substring(13, 16) + ' PM'
            : created_at.substring(11, 16) + ' AM'

    const date = created_at.substring(4, 8) + created_at.substring(8, 10) + ', ' + created_at.substr(26)

    return (
        <View style={{marginTop: 10, justifyContent: 'space-between'}}>
            <View>
                <Text style={{ fontFamily: 'Helvetica-Neue-Light', color: 'gray' }}>
                    {time + ' · ' + date}
                </Text>
                <View style={{ height: 1, width: '100%', marginVertical: 10, backgroundColor: 'lightgray' }} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Icon name="tw_and_fb_icons-01" size={15} color="gray" style={{marginRight: 8}} />
                <Icon name="tw_and_fb_icons-02" size={15} color="gray" style={{marginRight: 8}}/>
                <Icon name="tw_and_fb_icons-03" size={15} color="gray" style={{marginRight: 8}}/>
            </View>
        </View>
    )
}

export default TweetFooter