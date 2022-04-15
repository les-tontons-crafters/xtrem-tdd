import React from 'react'
import ThemeTopic, {
  Props as ThemeTopicProps,
} from 'gatsby-theme-kb/src/components/Topic'

interface TopicProps extends ThemeTopicProps {}

const Topic = (props: TopicProps) => {
  return (
    <>
      <ThemeTopic {...props}></ThemeTopic>
    </>
  )
}

export default Topic
