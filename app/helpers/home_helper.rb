module HomeHelper
  
  def commission_qualified
    current_user.packtype_id.to_i >= 0 ? "YES" : "NO" 
  end
  
  def acceler8_tracker_day
    days = (current_user.registration_date.to_date - Time.now.to_date).to_i + 28 
    # days <= 0 ? 0 : days
    if current_user.registration_date.to_date < "2014-03-04".to_date && Time.now.to_date <= "2014-03-31".to_date
      ("2014-03-31".to_date - Time.now.to_date).to_i
    else
      days <= 0 ? 0 : days
    end
  end

  def get_acceler8_tracker(tracker)
    if tracker.empty?
      hash = {'L'=>0, 'R'=>0}
      {
        'levels' =>{ 'level1'=>hash, 'level2'=>hash, 'level3'=>hash },
        'count'  =>0
      }
    else
      tracker
    end
  end

  def get_team_volumes(team_volumes)
    if team_volumes.empty?
      hash = {
        "current-monthly" => {'L' => 0, 'R' => 0},
        "current-weekly"  => {'L' => 0, 'R' => 0}
      }
      { 'pc1' => hash, 'pc2' => hash, 'pc3' => hash }
    else
      team_volumes
    end
  end

end
