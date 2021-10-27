import React from 'react'
import { Appbar, Colors } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { NavProps } from '../../@types/nav-types';

interface Props  {
  title: string
  subTitle?: string
}

export function Header({title, subTitle}: Props) {
  const { dispatch  } = useNavigation<NavProps>()

  function handleOpenMenu(){
    dispatch(DrawerActions.openDrawer());
  }

  return (
    <Appbar.Header style={{ backgroundColor: Colors.blue800 }}>
      <Appbar.Action icon="menu" style={{ backgroundColor: Colors.orange900 }} onPress={()=>handleOpenMenu()} />
      <Appbar.Content title={title} subtitle={subTitle} />
    </Appbar.Header>
  );
};