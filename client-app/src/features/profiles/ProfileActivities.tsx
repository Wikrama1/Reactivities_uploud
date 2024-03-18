import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Card, Grid, Header, Tab, Image } from "semantic-ui-react";
import { userActivity } from "../../app/models/profile";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const panes = [
    { menuItem: 'Future Events', pane: {key: 'future' }},
    {menuItem: 'Past Events', pane: {key: 'past'}},
    {menuItem: 'Hosting', pane: {key: 'hosting'}},
    {menuItem: 'Private', pane: {key: 'private'}},
];

export default observer(function ProfileActivities() {
    const { profileStore } = useStore();
    const {
        loadUserActiviies,
        profile,
        userActivities,
    } = profileStore;

    useEffect(() => {
        loadUserActiviies(profile!.username);
    }, [loadUserActiviies, profile]);


    return(
        <Tab.Pane /*loading ={loadingActivities}*/>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='calendar' content={'Activities'}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        // onTabChange={(e, data ) =>handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemPerRows={4}>
                        {userActivities.map((activity: userActivity) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}

                            >
                                <Image
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover'}}
                                
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{activity.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(activity.date), 'do LLL')}</div>
                                        <div>{format(new Date(activity.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>      
    );
});