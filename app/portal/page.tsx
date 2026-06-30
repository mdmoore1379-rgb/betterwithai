  // When logging in as any team role (pm, dev, team_member), default to the employee clarity experience
  if (isMaster) {
    setCurrentRole('owner');
  } else if (mockEmail.includes('ops')) {
    setCurrentRole('internal');
  } else if (['pm', 'dev', 'team_member'].includes(currentRole) || !currentRole) {
    setCurrentRole('team_member');
  } else {
    setCurrentRole('client');
  }