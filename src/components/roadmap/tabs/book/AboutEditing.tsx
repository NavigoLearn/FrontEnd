import React from 'react';
import MainTitle from '@components/roadmap/tabs/book/parts/MainTitle';
import ChapterTitle from '@components/roadmap/tabs/book/parts/ChapterTitle';
import TLDR from '@components/roadmap/tabs/book/parts/TLDR';
import BulletList from '@components/roadmap/tabs/book/parts/BulletList';

const chapters = [
  {
    title: 'What is a roadmap?',
    text: 'A roadmap is supposed to be a way to structure information at a high level and offer an overview of a field that you want to learn as a whole and all the possibilities you have in that field. A roadmap uses node ( that can be of multiple types ) and pages to hold information. They are highly customizable and are an effective tool for learning and helping others to learn',
    TLDR: 'A page with nodes you can elements-editing to organize information better',
  },
];

const AboutEditing = () => {
  return (
    <div className='w-full'>
      <MainTitle text='About Editing' />
      <div className='w-full flex justify-center'>
        <img
          draggable='false'
          alt='img node explanation'
          src='/roadmap/nodeExpl.png'
          className='w-full md:w-4/6 '
        />
      </div>
      <BulletList
        text="You do some actions to each node : add a child node, convert its type, turn it into another type or change its type ( with image ) \n
The roadmap is supposed to have a chain of main rows and secondary nodes on the side with additional info . There should be a single main node chain \n
The main path ( a chain of info nodes with main as their hierarchy ) is meant for general chapters and the secondary nodes for giving details on those chapters. The secondary nodes can have more secondary nodes, but this kind of nesting shouldn't go too far. \n"
      />
      <TLDR text='Roadmap has a main path of info nodes and secondary nodes' />
      <div className='h-20' />
      <ChapterTitle text='Restrictions about editing' />
      <BulletList
        text="The roadmap is supposed to have a chain of main rows and secondary nodes on the side with additional info . There should be a single main node chain \n
The main path is meant for general chapters and the secondary nodes for giving details on those chapters. The secondary nodes can have more secondary nodes, but this kind of nesting shouldn't go too far. \n
adding a node adds another node with a connection to the current node \n
deleting a node will reroute all connections of its children nodes to the parent of the node \n
you can freely convert from between node types ( more on that later ) as long as it doesn't break the main node chain \n"
      />
      <TLDR text='doing anything that will create 2 main paths or sever the main path or modify the root node is not allowed' />
    </div>
  );
};

export default AboutEditing;
