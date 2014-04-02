module FileHelper
  def basename(file)
    File.basename(file, ".pdf")
  end
  
  def ctime(file)
    File.ctime(File.expand_path(file, 'public')).to_date
  end

  def extname(file)
    File.extname(file).to_s.upcase
  end
end
