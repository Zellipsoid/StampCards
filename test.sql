print(db.execute("SELECT u.username as u, birthday, rank, (SELECT sum(stamp.value) FROM stamp WHERE u.username = stamp.username) as stamp_balance, (SELECT count(*) FROM stamp WHERE e.employee_id = stamp.employee_id) as stamps_given, current_user_session FROM user as u NATURAL LEFT JOIN employee as e WHERE u.username=?;", ("cburke1@leapdoctor.com",)).fetchone())