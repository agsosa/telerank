import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { formattedNumber } from '../utils/Helpers';

export default function Stats() {
    return (
    <Grid style={styles.grid}>
        <Col style={styles.col}>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Canales</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Grupos</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>En revision</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
        </Col>
        <Col style={styles.col}> 
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Bots</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Stickers</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Eliminados</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
        </Col>
        <Col style={styles.col}> 
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Ratings</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Comments</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
                <Row style={styles.row}>     
                    <Text style={styles.row_title}>Views</Text>
                    <Text style={styles.row_number}>{formattedNumber(54123)}</Text> 
                </Row>
        </Col>
    </Grid>
    )
}

const styles = StyleSheet.create({
    grid: {
        elevation:1,
        marginHorizontal:-10,
        marginBottom:15,
        backgroundColor:'white',
        elevation:2,
        borderRadius:5,
    },
    row: {
        flexDirection:'column', 
        alignContent:'center', 
        alignItems:'center',
        padding:5,
    },
    col: {
     height: '100%', 
     justifyContent:'center', 
     alignContent:'center', 
     alignItems:'center',
    },
    row_title: {
        fontSize:15,
        color:'gray'
    },
    row_number: {
        fontSize:25,
        fontWeight:'bold',
        color: '#2196F3',
    }

  });
  