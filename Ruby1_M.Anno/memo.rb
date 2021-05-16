require "csv"

puts "1(新規メモを作成) or 2（既存のメモを編集する）"

memo_type = gets.to_i

if memo_type == 1 then
  puts "拡張子を除いたファイルを入力してください"
  title = gets.to_s
  
  puts "メモしたい内容を記入してください"
  puts "完了したらCtrl + Dを押します"
  contents = readlines.map(&:chomp)
  CSV.open(title+".csv","w") do |f|
    f << contents
  end
  
elsif memo_type == 2 
  puts "拡張子を除いたファイルを入力してください"
  title = gets.to_s
  puts "現在のメモの内容です"
  csv = CSV.open(title+".csv")
    csv.each do |row|
      p row
    end
  csv.close
  
  puts "メモしたい内容を記入してください"
  puts "完了したらCtrl + Dを押します"
  contents = readlines.map(&:chomp)
  CSV.open(title+".csv","a") do |f|
    f << contents
  end
else
  puts "Restart from first. (Type 1 or 2)"
end