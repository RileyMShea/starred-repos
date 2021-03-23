import { Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '@material-ui/core';
import { orderBy, range } from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStuffQuery } from './generated/graphql';
import { PermanentDrawerLeft } from './PermanentDrawerLeft';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 300,
      display: 'flex',
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    avatar: {
      margin: theme.spacing(4),
    },
  })
);

const App = () => {
  const { loading, data } = useStuffQuery();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <PermanentDrawerLeft>
        <div>
          {loading ? (
            <Skeleton>
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar
              alt="Riley Shea"
              src={data?.user?.avatarUrl}
              className={classes.avatar}
            />
          )}
          <Typography variant="h1" align="center">
            My Starred Repos
          </Typography>

          <Grid container spacing={2}>
            {loading
              ? range(50).map((el, index) => (
                  <Skeleton key={index}>
                    <Card className={classes.root} />
                  </Skeleton>
                ))
              : orderBy(
                  data?.user?.starredRepositories?.nodes,
                  (x) => x?.stargazerCount,
                  ['desc']
                )
                  ?.filter((repo) => repo?.primaryLanguage?.name === 'Python')
                  .map((starredRepo, index) => {
                    return (
                      <Card className={classes.root} key={index}>
                        <CardContent>
                          <a href={starredRepo?.url}>
                            <Link
                              component="button"
                              variant="body2"
                              target="_blank"
                            >
                              {starredRepo?.name}
                            </Link>
                          </a>
                          <Typography
                            variant="body1"
                            display="inline"
                            gutterBottom={true}
                          >
                            :{starredRepo?.stargazerCount}{' '}
                            <StarIcon color="primary" />
                          </Typography>
                          <Typography variant="caption">
                            {starredRepo?.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
          </Grid>
        </div>
      </PermanentDrawerLeft>
    </Grid>
  );
};

export default App;
