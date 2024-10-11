// iconUtils.js
export const getIconUrl = (deviceType, type) => {
  const droneIcons = {
    'Drone1': 'https://lh3.googleusercontent.com/d/16fWDS2f_VFv6WqNgSvXiJtnTwJGEJK3s',
    'Drone2': 'https://lh3.googleusercontent.com/d/1Q-ANA4EsRBdA418wY2ONnfLJ7JWl98uo',
    'Drone3': 'https://lh3.googleusercontent.com/d/19Nh8f1oqHUTXT1OT3zgILbdjO9C-jcZA'
  };

  const appIcons = {
    'Drone1': 'https://lh3.googleusercontent.com/d/14Z7XPzPlRdxyWGfslEuYsupoT0s_483i',
    'Drone2': 'https://lh3.googleusercontent.com/d/1AggZmwK3gE-jdKb_nNf4qhf1qct05Qyz',
    'Drone3': 'https://lh3.googleusercontent.com/d/1tw-NZY_vjFD1gwgh0F2DGhMSjU57Dpv1'
  };

  const homeIcons = {
    'Drone1': 'https://lh3.googleusercontent.com/d/1VLSCKUP_Ws6TYMARaz0xPbarbb_pomdZ',
    'Drone2': 'https://lh3.googleusercontent.com/d/135ApWg0e52g5lnILGwsuB9GHm2wBzULy',
    'Drone3': 'https://lh3.googleusercontent.com/d/1P-ayl_WP7OOpZ2rW3CutynLvGCtn3jlq'
  };

  if (type === 'drone') return droneIcons[deviceType];
  if (type === 'app') return appIcons[deviceType];
  if (type === 'home') return homeIcons[deviceType];
};
