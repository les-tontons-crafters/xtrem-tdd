import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ValueItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const ValueList: ValueItem[] = [
  {
    title: 'Community',
    Svg: require('@site/static/images/home/undraw_engineering_team_a7n2.svg')
      .default,
    description: <>Keen to share their knowledge with the whole community.</>,
  },
  {
    title: 'Excellence',
    Svg: require('@site/static/images/home/undraw_wireframing_re_q6k6.svg')
      .default,
    description: <>Steadily seeking how to build the thing right.</>,
  },
  {
    title: 'Learning',
    Svg: require('@site/static/images/home/undraw_mathematics_-4-otb.svg')
      .default,
    description: <>Continuous improvement and learning.</>,
  },
];

function Item({ title, Svg, description }: ValueItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.itemSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageValues(): JSX.Element {
  return (
    <section className={styles.items}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Our Values
        </Heading>
        <div className="row">
          {ValueList.map((props, idx) => (
            <Item key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
