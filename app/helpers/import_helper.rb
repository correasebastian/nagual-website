module ImportHelper
  def status_image(status)
    icon = case status
           when 'success' then 'check.png'
           when 'error'   then 'error.png'
           when 'running' then 'running.png'
           when 'warning' then 'alert.png'
           else 'error.png'
           end

    image_tag(icon)
  end
end
